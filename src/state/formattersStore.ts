import { makeAutoObservable } from 'mobx';

import defaultFormatters from '../configs/formattersConfig';
import type { StoriesAPIFormatters } from '../types';
import { deepMerge } from '../utils';
import type RootStore from './rootStore';

export default class FormattersStore {
  formatters: StoriesAPIFormatters = defaultFormatters;

  constructor(public root: RootStore, formatters: Partial<StoriesAPIFormatters> = {}) {
    makeAutoObservable(this);
    this.formatters = deepMerge(defaultFormatters, formatters);
    this.root = root;
  }

  get collectionStoriesListHeader() {
    return this.formatters.collectionStoriesListHeader;
  }

  get momentQueryParamKey() {
    return this.formatters.momentQueryParamKey;
  }
}
