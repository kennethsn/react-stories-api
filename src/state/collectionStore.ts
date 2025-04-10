import {
  makeAutoObservable,
  runInAction,
  toJS,
} from 'mobx';
import type { FC } from 'react';

import type { CollectionSlotProps } from '../components/CollectionSlot/CollectionSlot.types';
import { COLLECTION_SEARCH_MIN_THRESHOLD, COLLECTION_STORIES_DEFAULT_PAGE_SIZE } from '../constants';
import type {
  Collection,
  DataSource,
  EditableCollectionKey,
  MutableCollection,
  SaveStatus,
  StoriesAPIStatus,
  StoriesAPIStoriesResponse,
} from '../types';
import { buildDynamicGridSize } from '../utils/grid';
import { deepCopy } from '../utils/object';
import { openJSON } from '../utils/url';
import type RootStore from './rootStore';

export type CollectionStoreOptions = {
  // Forces search to be enabled regardless of the number of stories
  readonly alwaysEnableSearch?: boolean;
  readonly collection: Collection;
  readonly editable?: boolean;
  // Allow clicking on stories that do not have a 'PUBLISHED' status
  readonly enableAllStories?: boolean;
  readonly onPageChange?: (page: number, collection: CollectionStore) => Promise<void>;
  readonly onSave?: (collection: Collection) => Promise<void>;
  readonly onSearch?: (searchInput: string, collection: CollectionStore) => Promise<void>;
  readonly page?: number;
  readonly searchInput?: string;
  readonly slots?: { [key: string]: FC<Omit<CollectionSlotProps, 'component'>> };
  readonly source?: DataSource;
};

const defaultPageNumber = 1;

export default class CollectionStore {
  allStoriesAreEnabled: boolean;

  collection: MutableCollection;

  initialized = false;

  private initialCollection: Collection;

  isEditable: boolean;

  isEdited: boolean = false;

  page = defaultPageNumber;

  pageSize = COLLECTION_STORIES_DEFAULT_PAGE_SIZE; // TODO: make this configurable

  saveStatus?: SaveStatus;

  searchInput = '';

  private source: DataSource = 'local';

  private storiesAPIResponse?: StoriesAPIStoriesResponse;

  storiesAreLoading = false;

  storyStatuses?: StoriesAPIStatus[];

  constructor(public root: RootStore, public options: CollectionStoreOptions) {
    makeAutoObservable(this);
    this.allStoriesAreEnabled = !!options.enableAllStories;
    this.collection = deepCopy(options.collection);
    this.initialCollection = deepCopy(options.collection);
    this.isEditable = !!options.editable;
    this.page = options.page ?? defaultPageNumber;
    this.searchInput = options.searchInput ?? '';
    this.source = options.source ?? 'local';
    this.root = root;
  }

  get badge() {
    if (this.collection.badge) {
      return this.collection.badge;
    }
    if (this.isPreview) {
      return 'Coming Soon';
    }
    if (this.isFeatured) {
      return 'Featured';
    }
    return null;
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

  get hasBadge() {
    return !!this.badge;
  }

  get hasDescription() {
    return !!this.description;
  }

  get hasFeaturedStories() {
    return this.featuredStoriesCount > 0;
  }

  get hasImage() {
    return !!this.image;
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

  get isFeatured() {
    return this.collection.is_featured;
  }

  get isPreview() {
    return this.status === 'PREVIEW';
  }

  get isPublished() {
    return this.status === 'PUBLISHED';
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

  get lastPage() {
    return this.storiesAPIResponse?.last_page ?? defaultPageNumber;
  }

  get name() {
    return this.collection.name;
  }

  get noCurrentStories() {
    return this.storiesCount === 0;
  }

  get overrideTotalStoriesCount() {
    return this.searchIsEnabled ? (
      Math.max(this.totalStoriesCount, COLLECTION_SEARCH_MIN_THRESHOLD)
    ) : this.totalStoriesCount;
  }

  get searchIsEnabled() {
    return !!this.options.onSearch && (
      this.options.alwaysEnableSearch
      || this.totalStoriesCount >= COLLECTION_SEARCH_MIN_THRESHOLD
    );
  }

  get shouldShowNoResultsMessage() {
    return this.noCurrentStories && !this.storiesAreLoading;
  }

  get shouldShowPagination() {
    return this.lastPage > 1;
  }

  get shouldShowStoriesList() {
    return this.searchIsEnabled || this.totalStoriesCount > 1;
  }

  get slots() {
    return this.options.slots;
  }

  get status() {
    return this.collection.status;
  }

  get stories() {
    return this.storiesAPIResponse?.stories ?? this.collection.stories ?? [];
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
    return (
      this.collection.total_stories_count
      ?? this.storiesAPIResponse?.total_count
        ?? this.storiesCount
    );
  }

  get sourceIsAPI() {
    return this.source === 'api';
  }

  async changePage(page: number) {
    this.setPage(page);
    await this.loadStories();
  }

  download() {
    const json = this.toJSON();
    openJSON(json);
  }

  getSlotComponent(slot: string) {
    return this.slots?.[slot];
  }

  async init() {
    if (this.sourceIsAPI) {
      await this.loadStories();
    }
    runInAction(() => {
      this.initialized = true;
    });
  }

  isSlotAvailable(slot: string) {
    return !!this.slots?.[slot];
  }

  async loadStories() {
    this.storiesAreLoading = true;
    const options = {
      page: this.page,
      page_size: this.pageSize,
      q: this.searchInput || undefined,
      statuses: this.storyStatuses,
    };
    const storiesAPIResponse = await this.root.api.getStories(this.id, options);
    runInAction(() => {
      this.storiesAPIResponse = storiesAPIResponse;
      this.storiesAreLoading = false;
    });
  }

  onEdit() {
    this.isEdited = true;
    this.saveStatus = undefined;
  }

  refresh = async () => {
    this.collection = await this.root.api.getCollection(this.id);
    await this.loadStories();
  };

  reset() {
    this.collection = deepCopy(this.initialCollection);
    this.init();
    this.isEdited = false;
  }

  resetPage() {
    this.setPage(defaultPageNumber);
  }

  async save() {
    this.saveStatus = 'SAVING';
    const collection = this.toJSON();
    try {
      await this.options.onSave?.(collection);
      runInAction(() => {
        this.initialCollection = deepCopy(collection);
        this.saveStatus = 'SUCCESS';
        this.isEdited = false;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.saveStatus = 'FAILED';
    }
  }

  async search() {
    this.resetPage();
    await this.loadStories();
  }

  setPage(page: number) {
    this.page = page;
  }

  setSearchInput(input: string) {
    this.searchInput = input;
  }

  setStoryStatuses(statuses: StoriesAPIStatus[]) {
    this.storyStatuses = statuses;
  }

  toJSON() {
    return toJS(this.collection);
  }

  updateField(field: EditableCollectionKey, value: string) {
    runInAction(() => {
      this.collection[field] = value as never;
      this.onEdit();
    });
  }

  updatePageTitle() {
    const title = this.root.formatters.formatCollectionPageTitle({
      collectionId: this.id,
      collectionName: this.name,
    });
    this.root.dom.updatePageTitle(title);
  }
}
