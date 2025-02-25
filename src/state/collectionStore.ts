import {
  makeAutoObservable,
  reaction,
  runInAction,
  toJS,
} from 'mobx';
import type { FC } from 'react';

import type { CollectionSlotProps } from '../components/CollectionSlot/CollectionSlot.types';
import type {
  Collection,
  DataSource,
  EditableCollectionKey,
  MutableCollection,
  SaveStatus,
} from '../types';
import { buildDynamicGridSize } from '../utils/grid';
import { openJSON } from '../utils/url';
import type RootStore from './rootStore';

export type CollectionStoreOptions = {
  readonly collection: Collection;
  readonly editable?: boolean;
  readonly onSave?: (collection: Collection) => Promise<void>;
  readonly slots?: { [key: string]: FC<Omit<CollectionSlotProps, 'component'>> };
  readonly source?: DataSource;
};

export default class CollectionStore {
  collection: MutableCollection;

  private initialCollection: Collection;

  isEditable: boolean;

  isEdited: boolean = false;

  page = 1;

  saveStatus?: SaveStatus;

  private source: DataSource = 'local';

  storiesAreLoading = false;

  constructor(public root: RootStore, public options: CollectionStoreOptions) {
    makeAutoObservable(this);
    this.initialCollection = options.collection;
    this.isEditable = !!options.editable;
    this.collection = { ...options.collection };
    this.source = options.source ?? 'local';
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

  get getField() {
    return (field: EditableCollectionKey) => this.collection[field] ?? '';
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

  get isDownloadable() {
    return this.isEditable;
  }

  get isFailed() {
    return this.saveStatus === 'FAILED';
  }

  get isResettable() {
    return this.isEdited;
  }

  get isSavable() {
    return this.isEdited;
  }

  get isSaved() {
    return this.saveStatus === 'SUCCESS';
  }

  get isSaving() {
    return this.saveStatus === 'SAVING';
  }

  get name() {
    return this.collection.name;
  }

  get shouldShowStoriesList() {
    return this.totalStoriesCount > 1;
  }

  get slots() {
    return this.options.slots;
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

  get sourceIsAPI() {
    return this.source === 'api';
  }

  download() {
    const json = this.toJSON();
    openJSON(json);
  }

  getSlotComponent(slot: string) {
    return this.slots?.[slot];
  }

  init() {
    if (this.sourceIsAPI) {
      reaction(this.watchLoadStoriesOptions, this.loadStoriesEffect, { fireImmediately: true });
    }
  }

  isSlotAvailable(slot: string) {
    return !!this.slots?.[slot];
  }

  async loadStories() {
    this.storiesAreLoading = true;
    const { stories, total_count: totalCount } = await this.root.api.getStories(this.id);
    runInAction(() => {
      // @ts-expect-error editing a read-only value
      this.collection.total_stories_count = totalCount;
      // @ts-expect-error editing a read-only value
      this.collection.stories = stories;
      this.storiesAreLoading = false;
    });
  }

  loadStoriesEffect = () => {
    this.loadStories();
  };

  onEdit() {
    this.isEdited = true;
    this.saveStatus = undefined;
  }

  refresh = async () => {
    this.collection = await this.root.api.getCollection(this.id);
    await this.loadStories();
  };

  reset() {
    this.collection = { ...this.initialCollection };
    this.init();
    this.isEdited = false;
  }

  async save() {
    this.saveStatus = 'SAVING';
    const collection = this.toJSON();
    try {
      await this.options.onSave?.(collection);
      runInAction(() => {
        this.saveStatus = 'SUCCESS';
        this.isEdited = false;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.saveStatus = 'FAILED';
    }
  }

  toJSON() {
    return toJS(this.collection);
  }

  updateField(field: EditableCollectionKey, value: string) {
    runInAction(() => {
      this.collection[field] = value;
      this.onEdit();
    });
  }

  watchLoadStoriesOptions() {
    return { page: this.page };
  }
}
