import { makeAutoObservable } from 'mobx';

import type { Collection } from '../types';
import { buildDynamicGridSize } from '../utils';
import type RootStore from './rootStore';

export default class CollectionStore {
  constructor(public root: RootStore, public collection: Collection) {
    makeAutoObservable(this);
    this.collection = collection;
    this.root = root;
  }

  get description() {
    return this.collection.description;
  }

  get doesNotHaveDescription() {
    return !this.hasDescription;
  }

  get featuredStories() {
    return this.collection.featured_stories ?? [];
  }

  get featuredStoriesCount() {
    return this.featuredStories.length;
  }

  get firstFeaturedStory() {
    return this.featuredStories[0];
  }

  get firstStory() {
    return this.stories[0];
  }

  get gridSize() {
    return buildDynamicGridSize(this.featuredStoriesCount);
  }

  get hasDescription() {
    return !!this.description;
  }

  get hasFeaturedStories() {
    return this.featuredStoriesCount > 0;
  }

  get hasOneFeaturedStory() {
    return this.featuredStoriesCount === 1;
  }

  get hasOneStory() {
    return this.totalStoriesCount === 1;
  }

  get hasSubtitle() {
    return !!this.subtitle;
  }

  get id() {
    return this.collection.id;
  }

  get image() {
    return this.collection.image;
  }

  get name() {
    return this.collection.name;
  }

  get shouldShowStoriesList() {
    return this.totalStoriesCount > 1;
  }

  get stories() {
    return this.collection.stories ?? [];
  }

  get storiesCount() {
    return this.stories?.length ?? 0;
  }

  get storiesListHeader() {
    return this.root.formatters.collectionStoriesListHeader;
  }

  get subtitle() {
    return this.collection.subtitle;
  }

  get totalStoriesCount() {
    return this.collection.total_stories_count ?? this.storiesCount;
  }
}
