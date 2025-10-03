import { makeAutoObservable, runInAction } from 'mobx';

import { PAGINATION_DEFAULT_PAGE_NUMBER } from '../constants';
import type RootStore from './rootStore';

export type PaginationStoreOptions = {
  defaultPageNumber?: number;
  disabled?: boolean;
  lastPage?: number;
  onChange: (page: number) => Promise<void>;
  query?: string;
  selectedPage?: number;
  pageSize?: number;
};

export type SelectedFacets = Record<string, string[]>;

export default class PaginationStore {
  defaultPageNumber: number = PAGINATION_DEFAULT_PAGE_NUMBER;

  disabled: boolean;

  lastPage: number;

  loading: boolean;

  private options: PaginationStoreOptions;

  selectedPage: number;

  constructor(public root: RootStore, options: PaginationStoreOptions) {
    makeAutoObservable(this);
    this.root = root;
    this.options = options;
    this.defaultPageNumber = options.defaultPageNumber || PAGINATION_DEFAULT_PAGE_NUMBER;
    this.selectedPage = options.selectedPage || this.defaultPageNumber;
    this.lastPage = options.lastPage || this.selectedPage;
    this.disabled = options.disabled || false;
    this.loading = false;
  }

  get pageSize() {
    return this.options.pageSize;
  }

  get queryParams() {
    return {
      page: this.selectedPage.toString(),
      page_size: this.pageSize?.toString(),
    };
  }

  get shouldShow() {
    return this.lastPage > 1;
  }

  changePage = async (page: number) => {
    if (this.disabled || this.loading || page === this.selectedPage) return;
    this.loading = true;
    this.setSelectedPage(page);
    try {
      await this.options.onChange(page);
    } finally {
      this.loading = false;
    }
  };

  reset() {
    runInAction(() => {
      this.setSelectedPage(this.defaultPageNumber);
      this.setLastPage(this.defaultPageNumber);
    });
  }

  setLastPage(page: number) {
    this.lastPage = page;
  }

  setSelectedPage(page: number) {
    this.selectedPage = page;
  }
}
