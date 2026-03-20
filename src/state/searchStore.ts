import debounce from 'lodash.debounce';
import { makeAutoObservable, runInAction } from 'mobx';

import { DEFAULT_DEBOUNCE_DELAY } from '../constants';
import type {
  Nullable,
  SearchFacet,
  SearchFacetDateRangeValue,
  SearchFacetNumberRangeValue,
  SearchFacets,
  SearchFacetValue,
  SearchStartMode,
  SearchSuggestion,
  SearchSuggestions,
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

const shouldShowSuggestionInLocation = (
  suggestion: SearchSuggestion,
  location: 'input' | 'landing',
) => {
  const locationValue = suggestion.locations?.[location];
  if (locationValue === undefined) {
    return true;
  }
  return !!locationValue;
};

export type SearchStoreOptions = {
  count?: number;
  debounceDelay?: number;
  disabled?: boolean;
  enableInputSuggestions?: boolean;
  enableLandingSuggestions?: boolean;
  extraFingerprint?: () => string;
  facets?: Nullable<SearchFacets>;
  onSearch: (bypassCache?: boolean) => Promise<number>;
  placeholder?: string;
  query?: string;
  startMode?: SearchStartMode;
  suggestions?: Nullable<SearchSuggestions>;
  searchOnFacetChange?: boolean;
  selectedFacets?: SelectedSearchFacets;
};

export default class SearchStore {
  committedQuery: string;

  count: Nullable<number> = null; // null means unknown, 0 shows no results

  debouncedSubmit: () => void;

  disabled: boolean;

  enableInputSuggestions: boolean;

  enableLandingSuggestions: boolean;

  facets: Nullable<SearchFacets>;

  private hasPendingSubmit = false;

  isFocused: boolean = false;

  loading: boolean;

  private options: SearchStoreOptions;

  query: string;

  // Tracks the query fingerprint that's currently in flight for comparison on response
  private runningQuery: string = '';

  selectedFacets: SelectedSearchFacets = {};

  startMode: SearchStartMode;

  suggestionLoadingPlaceholder: Nullable<string> = null;

  suggestions: SearchSuggestions;

  constructor(public root: RootStore, options: SearchStoreOptions) {
    makeAutoObservable(this);
    this.root = root;
    this.options = options;
    this.count = options.count;
    this.disabled = options.disabled || false;
    this.query = options.query ?? '';
    this.committedQuery = this.query;
    this.selectedFacets = options.selectedFacets || {};
    this.facets = options.facets;
    this.loading = false;
    this.enableInputSuggestions = options.enableInputSuggestions ?? true;
    this.enableLandingSuggestions = options.enableLandingSuggestions ?? true;
    this.startMode = options.startMode ?? 'results';
    this.suggestions = options.suggestions ?? [];
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

  get inputSuggestions() {
    if (!this.enableInputSuggestions) {
      return [];
    }

    const normalizedQuery = this.query.trim().toLowerCase();

    // Show all input suggestions when focused, regardless of query
    if (this.isFocused && normalizedQuery === '') {
      return this.suggestions
        .filter((suggestion) => shouldShowSuggestionInLocation(suggestion, 'input'))
        .slice(0, 8);
    }

    // When typing, filter suggestions by query
    if (!normalizedQuery) {
      return [];
    }

    return this.suggestions
      .filter((suggestion) => shouldShowSuggestionInLocation(suggestion, 'input'))
      .filter((suggestion) => {
        const displayName = suggestion.display_name.toLowerCase();
        const suggestionQuery = (suggestion.query ?? suggestion.display_name).toLowerCase();
        return displayName.includes(normalizedQuery) || suggestionQuery.includes(normalizedQuery);
      })
      .slice(0, 8);
  }

  get isEmptyLandingMode() {
    return this.startMode === 'emptyLanding';
  }

  get landingSuggestions() {
    if (!this.enableLandingSuggestions || !this.isEmptyLandingMode || this.hasSearchContent) {
      return [];
    }

    return this.suggestions
      .filter((suggestion) => shouldShowSuggestionInLocation(suggestion, 'landing'))
      .slice(0, 12);
  }

  get placeholder() {
    if (this.suggestionLoadingPlaceholder !== null) {
      return this.suggestionLoadingPlaceholder;
    }
    return this.options.placeholder
      || this.root.locale.translate?.('search.defaultPlaceholder')
      || 'Search...';
  }

  get queryParams() {
    const facets = this.hasSelectedFacets ? (
      serializeSelectedSearchFacets(this.selectedFacets)
    ) : undefined;
    return {
      facets,
      q: this.committedQuery || undefined,
    };
  }

  get shouldShowInputSuggestions() {
    return this.isFocused && this.inputSuggestions.length > 0 && !this.loading;
  }

  get shouldShowLandingSuggestions() {
    return this.landingSuggestions.length > 0 && !this.loading;
  }

  get shouldShowNoResultsMessage() {
    return this.count === 0 && !this.loading;
  }

  get shouldShowSearchIcon() {
    return !this.disabled && this.hasSearchContent;
  }

  async applySuggestion(suggestion: SearchSuggestion, bypassCache: boolean = false) {
    runInAction(() => {
      this.query = suggestion.query ?? '';
      this.selectedFacets = suggestion.facets ? { ...suggestion.facets } : {};
      this.suggestionLoadingPlaceholder = suggestion.display_name;
    });
    try {
      await this.submit(false, bypassCache);
    } finally {
      runInAction(() => {
        this.suggestionLoadingPlaceholder = null;
      });
    }
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
      q: this.committedQuery,
    }) + (this.options.extraFingerprint?.() ?? '');
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
      runInAction(() => {
        this.selectedFacets[key] = [...values, value];
      });
      this.handleSelectedFacetsChange();
    }
  }

  setDateRangeValue(key: string, value: SearchFacetDateRangeValue) {
    runInAction(() => {
      if (value.start || value.end) {
        this.selectedFacets[key] = value;
      } else {
        delete this.selectedFacets[key];
      }
    });
    this.handleSelectedFacetsChange();
  }

  setFocused(focused: boolean) {
    runInAction(() => {
      this.isFocused = focused;
    });
  }

  setNumberRangeValue(key: string, value: SearchFacetNumberRangeValue) {
    runInAction(() => {
      if (value.min !== undefined || value.max !== undefined) {
        this.selectedFacets[key] = value;
      } else {
        delete this.selectedFacets[key];
      }
    });
    this.handleSelectedFacetsChange();
  }

  setNumberValue(key: string, value: number | null) {
    runInAction(() => {
      if (value !== null) {
        this.selectedFacets[key] = value;
      } else {
        delete this.selectedFacets[key];
      }
    });
    this.handleSelectedFacetsChange();
  }

  setCount(count: Nullable<number>) {
    runInAction(() => {
      this.count = count;
    });
  }

  setQuery(query: string) {
    runInAction(() => {
      this.query = query;
    });
  }

  startLoading() {
    runInAction(() => {
      this.loading = true;
    });
  }

  stopLoading() {
    runInAction(() => {
      this.loading = false;
    });
  }

  async submit(force: boolean = false, bypassCache: boolean = false) {
    if (this.disabled) {
      return;
    }

    if (this.loading && !force) {
      runInAction(() => {
        this.hasPendingSubmit = true;
      });
      return;
    }

    runInAction(() => {
      this.hasPendingSubmit = false;
      this.committedQuery = this.query;
    });

    this.startLoading();
    const requestFingerprint = this.getQueryFingerprint();
    runInAction(() => {
      this.runningQuery = requestFingerprint;
    });

    try {
      // Call onSearch with bypassCache parameter
      const count = await this.options.onSearch(bypassCache);
      const currentQuery = this.getQueryFingerprint();

      // Ignore stale responses when input changed while request was in flight.
      if (currentQuery === requestFingerprint) {
        this.setCount(count);
      }
    } finally {
      const currentQuery = this.getQueryFingerprint();
      const needsRefetch = currentQuery !== this.runningQuery || this.hasPendingSubmit;

      runInAction(() => {
        this.runningQuery = '';
        this.hasPendingSubmit = false;
      });

      if (needsRefetch) {
        await this.submit(true, false);
      }
      this.stopLoading();
    }
  }
}
