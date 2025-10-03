import { makeAutoObservable } from 'mobx';

import defaultFormatters from '../configs/formattersConfig';
import type { CollectionId, StoriesAPIFormatters, StoryId } from '../types';
import { deepMergeMulti, removeNullishValues } from '../utils/object';
import { formatString } from '../utils/string';
import type RootStore from './rootStore';

export default class FormattersStore {
  overrides: Partial<StoriesAPIFormatters>;

  constructor(public root: RootStore, formatters: Partial<StoriesAPIFormatters> = {}) {
    makeAutoObservable(this);
    this.overrides = formatters;
    this.root = root;
  }

  get collectionPath() {
    return this.formatters.collectionPath;
  }

  get collectionStoriesListHeader() {
    return this.formatters.collectionStoriesListHeader;
  }

  get formatters() {
    return deepMergeMulti<StoriesAPIFormatters>(
      defaultFormatters,
      this.localeFormatters,
      this.overrides,
    );
  }

  get localeFormatters(): Partial<StoriesAPIFormatters> {
    const { translations } = this.root.locale;
    return removeNullishValues({
      ...translations,
      collectionPageTitle: translations['collection.pageTitle'],
      collectionStoriesListHeader: translations['collection.storiesList.header'],
      storyCollectionButtonLabel: translations['story.collectionButtonLabel'],
    });
  }

  get momentQueryParamKey() {
    return this.formatters.momentQueryParamKey;
  }

  get storyPath() {
    return this.formatters.storyPath;
  }

  formatCollectionPageTitle(options: {
    readonly collection_id: CollectionId;
    readonly collection_name: string;
  }) {
    return formatString(this.formatters.collectionPageTitle, options);
  }

  formatStoryPageTitle(options: {
    readonly collection_id: CollectionId;
    readonly collection_name: string;
    readonly story_id: StoryId;
    readonly story_label: string;
  }) {
    return formatString(this.formatters.storyPageTitle, options);
  }
}
