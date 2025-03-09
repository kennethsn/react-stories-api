import { makeAutoObservable } from 'mobx';

import defaultFormatters from '../configs/formattersConfig';
import type { CollectionId, StoriesAPIFormatters, StoryId } from '../types';
import { deepMerge } from '../utils/object';
import { formatString } from '../utils/string';
import type RootStore from './rootStore';

export default class FormattersStore {
  formatters: StoriesAPIFormatters = defaultFormatters;

  constructor(public root: RootStore, formatters: Partial<StoriesAPIFormatters> = {}) {
    makeAutoObservable(this);
    this.formatters = deepMerge(defaultFormatters, formatters);
    this.root = root;
  }

  get collectionPath() {
    return this.formatters.collectionPath;
  }

  get collectionStoriesListHeader() {
    return this.formatters.collectionStoriesListHeader;
  }

  get momentQueryParamKey() {
    return this.formatters.momentQueryParamKey;
  }

  get storyPath() {
    return this.formatters.storyPath;
  }

  formatCollectionPageTitle(options: {
    readonly collectionId: CollectionId;
    readonly collectionName: string;
  }) {
    return formatString(this.formatters.collectionPageTitle, options);
  }

  formatStoryPageTitle(options: {
    readonly collectionId: CollectionId;
    readonly collectionName: string;
    readonly storyId: StoryId;
    readonly storyLabel: string;
  }) {
    return formatString(this.formatters.storyPageTitle, options);
  }
}
