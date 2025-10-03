import debounce from 'lodash.debounce';
import { makeAutoObservable } from 'mobx';

import { DEFAULT_DEBOUNCE_DELAY } from '../constants';
import type {
  Nullable,
  SearchFacet,
  SearchFacets,
  SelectedSearchFacets,
} from '../types';
import { serializeSelectedSearchFacets } from '../utils/searchUtils';
import type RootStore from './rootStore';

export type SearchStoreOptions = {
  count?: number;
  debounceDelay?: number;
  disabled?: boolean;
  facets?: Nullable<SearchFacets>;
  onSearch: (query: string) => Promise<number>;
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

  get hasSearchContent() {
    return this.hasQuery || this.hasSelectedFacets;
  }

  get hasSelectedFacets() {
    return Object.keys(this.selectedFacets).length > 0
      && Object.values(this.selectedFacets).some((v) => v.length > 0);
  }

  get hasResults() {
    return !!this.count;
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
    const values = this.selectedFacets[key] || [];
    this.selectedFacets[key] = values.filter((v) => v !== value);
    if (this.selectedFacets[key].length === 0) {
      delete this.selectedFacets[key];
    }
    this.handleSelectedFacetsChange();
  }

  getFacet(key: string) {
    return this.facetMap[key];
  }

  getSelectedFacetValues(key: string) {
    return this.selectedFacets[key] || [];
  }

  handleSelectedFacetsChange() {
    if (this.options.searchOnFacetChange) {
      this.debouncedSubmit();
    }
  }

  selectFacetValue(key: string, value: string) {
    const values = this.selectedFacets[key] || [];
    if (!values.includes(value)) {
      this.selectedFacets[key] = [...values, value];
      this.handleSelectedFacetsChange();
    }
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

  async submit() {
    if (!this.canSubmit) {
      return;
    }
    this.startLoading();
    try {
      const count = await this.options.onSearch(this.query);
      this.setCount(count);
    } finally {
      this.stopLoading();
    }
  }
}
