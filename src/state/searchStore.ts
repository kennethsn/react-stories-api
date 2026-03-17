import debounce from 'lodash.debounce';
import { makeAutoObservable } from 'mobx';

import { DEFAULT_DEBOUNCE_DELAY } from '../constants';
import type {
  Nullable,
  SearchFacet,
  SearchFacetDateRangeValue,
  SearchFacetNumberRangeValue,
  SearchFacets,
  SearchFacetValue,
  SelectedSearchFacets,
} from '../types';
import {
  doesSearchFacetHaveValue,
  formatDateDisplay,
  getYearFromDate,
  isStringArrayValue,
  serializeSelectedSearchFacets,
} from '../utils/searchFacetUtils';
import type RootStore from './rootStore';

export type SearchStoreOptions = {
  count?: number;
  debounceDelay?: number;
  disabled?: boolean;
  facets?: Nullable<SearchFacets>;
  onSearch: (query: string, bypassCache?: boolean) => Promise<number>;
  placeholder?: string;
  query?: string;
  searchOnFacetChange?: boolean;
  selectedFacets?: SelectedSearchFacets;
};

export default class SearchStore {
  count: Nullable<number> = null; // null means unknown, 0 shows no results

  debouncedSubmit: () => void;

  disabled: boolean;

  facets: Nullable<SearchFacets>;

  loading: boolean;

  private options: SearchStoreOptions;

  query: string;

  // Tracks the query fingerprint that's currently in flight for comparison on response
  private runningQuery: string = '';

  selectedFacets: SelectedSearchFacets = {};

  constructor(public root: RootStore, options: SearchStoreOptions) {
    makeAutoObservable(this);
    this.root = root;
    this.options = options;
    this.count = options.count;
    this.disabled = options.disabled || false;
    this.query = options.query ?? '';
    this.selectedFacets = options.selectedFacets || {};
    this.facets = options.facets;
    this.loading = false;
    this.debouncedSubmit = debounce(
      this.submit.bind(this),
      options.debounceDelay || DEFAULT_DEBOUNCE_DELAY,
    );
  }

  get canSubmit() {
    return !this.disabled && !this.loading;
  }

  get facetMap() {
    const map: Record<string, SearchFacet> = {};
    this.facets?.forEach((facet) => {
      map[facet.key] = facet;
    });
    return map;
  }

  get hasFacets() {
    return this.facets?.length ? this.facets.length > 0 : false;
  }

  get hasQuery() {
    return this.query.length > 0;
  }

  get hasResults() {
    return !!this.count;
  }

  get hasSearchContent() {
    return this.hasQuery || this.hasSelectedFacets;
  }

  get hasSelectedFacets() {
    return Object.keys(this.selectedFacets).length > 0
      && Object.values(this.selectedFacets).some((v) => {
        if (Array.isArray(v)) return v.length > 0;
        if (typeof v === 'object' && v !== null) {
          return Object.values(v).some((val) => val !== undefined && val !== null);
        }
        return v !== undefined && v !== null;
      });
  }

  get placeholder() {
    return this.options.placeholder || 'Search...';
  }

  get queryParams() {
    const facets = this.hasSelectedFacets ? (
      serializeSelectedSearchFacets(this.selectedFacets)
    ) : undefined;
    return {
      facets,
      q: this.query || undefined,
    };
  }

  get shouldShowNoResultsMessage() {
    return this.count === 0 && !this.loading;
  }

  get shouldShowSearchIcon() {
    return !this.disabled && this.hasSearchContent;
  }

  canSelectFacets(isDesktop: boolean) {
    return this.hasFacets && isDesktop;
  }

  deselectFacet(key: string) {
    delete this.selectedFacets[key];
    this.handleSelectedFacetsChange();
  }

  deselectFacetValue(key: string, value: string) {
    const currentValue = this.selectedFacets[key];
    if (isStringArrayValue(currentValue)) {
      this.selectedFacets[key] = currentValue.filter((v) => v !== value);
      if ((this.selectedFacets[key] as string[]).length === 0) {
        delete this.selectedFacets[key];
      }
    }
    this.handleSelectedFacetsChange();
  }

  doesFacetHaveValue(key: string): boolean {
    return doesSearchFacetHaveValue(this.selectedFacets[key]);
  }

  /**
   * Get enriched facet with synthetic value_refs for continuous facets that have min=max
   */
  getEnrichedFacet(key: string): SearchFacet {
    const searchFacet = this.getFacet(key);
    if (!searchFacet) return searchFacet;

    const selectorType = this.getSelectorType(key);

    const isContinuousFacet = selectorType === 'year_range'
      || selectorType === 'date_range'
      || selectorType === 'number'
      || selectorType === 'number_range';

    const needsSyntheticValues = isContinuousFacet
      && (!searchFacet.value_refs || searchFacet.value_refs.length === 0)
      && searchFacet.bounds?.min !== undefined
      && searchFacet.bounds?.min === searchFacet.bounds?.max;

    if (needsSyntheticValues) {
      const value = String(searchFacet.bounds!.min);
      let displayLabel = value;

      // For year_range, show just the year instead of full ISO date
      if (selectorType === 'year_range') {
        const year = getYearFromDate(value);
        displayLabel = year ? String(year) : value;
      } else if (selectorType === 'date_range') {
        // For date_range, format as M/D/YYYY
        displayLabel = formatDateDisplay(value);
      }

      return {
        ...searchFacet,
        value_refs: [
          {
            count: 1,
            fill_rate: 1,
            label: displayLabel,
            value,
          },
        ],
      };
    }

    return searchFacet;
  }

  getFacet(key: string) {
    return this.facetMap[key];
  }

  private getQueryFingerprint(): string {
    return JSON.stringify({
      facets: this.selectedFacets,
      q: this.query,
    });
  }

  /**
   * Get the appropriate selector type for a facet, with fallback logic
   */
  getSelectorType(key: string): string {
    const searchFacet = this.getFacet(key);
    if (!searchFacet) return 'checkbox';

    const selectorType = searchFacet.selector_type || 'checkbox';

    // Fallback to checkbox if year_range has only one possible value
    if (selectorType === 'year_range') {
      const shouldUseYearRange = searchFacet.bounds?.min !== undefined
        && searchFacet.bounds?.max !== undefined
        && searchFacet.bounds.min !== searchFacet.bounds.max;

      return shouldUseYearRange ? 'year_range' : 'checkbox';
    }

    return selectorType;
  }

  getSelectedFacetValue(key: string): SearchFacetValue | undefined {
    return this.selectedFacets[key];
  }

  getSelectedFacetValues(key: string): string[] {
    const value = this.selectedFacets[key];
    return isStringArrayValue(value) ? value : [];
  }

  handleSelectedFacetsChange() {
    if (this.options.searchOnFacetChange) {
      this.debouncedSubmit();
    }
  }

  selectFacetValue(key: string, value: string) {
    const currentValue = this.selectedFacets[key];
    const values = isStringArrayValue(currentValue) ? currentValue : [];
    if (!values.includes(value)) {
      this.selectedFacets[key] = [...values, value];
      this.handleSelectedFacetsChange();
    }
  }

  setDateRangeValue(key: string, value: SearchFacetDateRangeValue) {
    if (value.start || value.end) {
      this.selectedFacets[key] = value;
    } else {
      delete this.selectedFacets[key];
    }
    this.handleSelectedFacetsChange();
  }

  setNumberRangeValue(key: string, value: SearchFacetNumberRangeValue) {
    if (value.min !== undefined || value.max !== undefined) {
      this.selectedFacets[key] = value;
    } else {
      delete this.selectedFacets[key];
    }
    this.handleSelectedFacetsChange();
  }

  setNumberValue(key: string, value: number | null) {
    if (value !== null) {
      this.selectedFacets[key] = value;
    } else {
      delete this.selectedFacets[key];
    }
    this.handleSelectedFacetsChange();
  }

  setCount(count: Nullable<number>) {
    this.count = count;
  }

  setQuery(query: string) {
    this.query = query;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  async submit(force: boolean = false, bypassCache: boolean = false) {
    if (this.disabled) {
      return;
    }

    if (this.loading && !force) {
      return;
    }

    this.startLoading();
    this.runningQuery = this.getQueryFingerprint();

    try {
      // Call onSearch with bypassCache parameter
      const count = await this.options.onSearch(this.query, bypassCache);
      this.setCount(count);
    } finally {
      const currentQuery = this.getQueryFingerprint();
      const needsRefetch = currentQuery !== this.runningQuery;

      this.runningQuery = '';

      if (needsRefetch) {
        await this.submit(true, false);
      }
      this.stopLoading();
    }
  }
}
