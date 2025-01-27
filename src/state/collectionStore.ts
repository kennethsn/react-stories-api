import {
  makeAutoObservable,
  reaction,
  runInAction,
  toJS,
} from 'mobx';

import type {
  Collection,
  DataSource,
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
  readonly source?: DataSource;
};

export type EditableCollectionKeys = 'description' | 'name' | 'subtitle';

export default class CollectionStore {
  collection: MutableCollection;

  private initialCollection: Collection;

  isEditable: boolean;

  isEdited: boolean = false;

  page = 1;

  resetKey = 0; // controls re-render when reset button is hit

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

  getField(field: EditableCollectionKeys) {
    return this.collection[field] ?? '';
  }

  init() {
    if (this.sourceIsAPI) {
      reaction(this.watchLoadStoriesOptions, this.loadStoriesEffect, { fireImmediately: true });
    }
  }

  async loadStories() {
    this.storiesAreLoading = true;
    const { stories, total_count: totalCount } = await this.root.api.getStories(this.id);
    runInAction(() => {
      this.collection.total_stories_count = totalCount;
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

  reset() {
    this.collection = { ...this.initialCollection };
    this.init();
    this.isEdited = false;
    this.resetKey += 1;
  }

  async save() {
    this.saveStatus = 'SAVING';
    const story = this.toJSON();
    await this.options.onSave?.(story);
    runInAction(() => {
      this.saveStatus = 'SUCCESS';
      this.isEdited = false;
    });
  }

  toJSON() {
    return toJS(this.collection);
  }

  updateField(field: EditableCollectionKeys, value: string) {
    runInAction(() => {
      this.collection[field] = value;
      this.onEdit();
    });
  }

  watchLoadStoriesOptions() {
    return { page: this.page };
  }
}
