import {
  makeAutoObservable,
  runInAction,
  toJS,
} from 'mobx';
import type { FC } from 'react';

import type { CollectionSlotProps } from '../components/CollectionSlot/CollectionSlot.types';
import type { CardsBrowserLayout } from '../components/UI/CardsBrowser/CardsBrowser.types';
import { COLLECTION_SEARCH_MIN_THRESHOLD, COLLECTION_STORIES_DEFAULT_PAGE_SIZE } from '../constants';
import type {
  Collection,
  DataSource,
  EditableCollectionKey,
  MutableCollection,
  Nullable,
  SaveStatus,
  SearchStartMode,
  SearchSuggestions,
  SelectedSearchFacets,
  SerializableRecord,
  StoriesAPIStatus,
  StoriesAPIStoriesResponse,
  StoryIdAction,
} from '../types';
import { buildDynamicGridSize } from '../utils/grid';
import { deepCopy, removeNullishValues } from '../utils/object';
import { openJSON } from '../utils/url';
import PaginationStore from './paginationStore';
import type RootStore from './rootStore';
import SearchStore from './searchStore';

export type CollectionStoreOptions = {
  // Forces search to be enabled regardless of the number of stories
  readonly alwaysEnableSearch?: boolean;
  readonly collection: Collection;
  readonly editable?: boolean;
  // Allow clicking on stories that do not have a 'PUBLISHED' status
  readonly enableAllStories?: boolean;
  readonly layout?: CardsBrowserLayout;
  readonly onPageChange?: (page: number, collection: CollectionStore) => Promise<void>;
  readonly onSave?: (collection: Collection) => Promise<void>;
  readonly onSearch?: (collection: CollectionStore) => Promise<void>;
  readonly page?: number;
  readonly pageSize?: number;
  readonly searchDefaultFacets?: SelectedSearchFacets;
  readonly searchDefaultQuery?: string;
  readonly searchInput?: string;
  readonly searchStartMode?: SearchStartMode;
  readonly searchSuggestions?: Nullable<SearchSuggestions>;
  readonly showInputSearchSuggestions?: boolean;
  readonly showLandingSearchSuggestions?: boolean;
  readonly showLocaleSelector?: boolean;
  readonly showStoriesListHeader?: boolean;
  readonly showStoryId?: boolean;
  readonly slots?: { [key: string]: FC<Omit<CollectionSlotProps, 'component'>> };
  readonly source?: DataSource;
  readonly storyIdActions?: StoryIdAction[];
};

export default class CollectionStore {
  allStoriesAreEnabled: boolean;

  collection: MutableCollection;

  initialized = false;

  private initialCollection: Collection;

  isEditable: boolean;

  isEdited: boolean = false;

  layout?: CardsBrowserLayout = 'standard';

  pagination: PaginationStore;

  saveStatus?: SaveStatus;

  search: SearchStore;

  private source: DataSource = 'local';

  private storiesAPIResponse?: StoriesAPIStoriesResponse;

  storiesAreLoading = false;

  storyStatuses?: StoriesAPIStatus[];

  constructor(public root: RootStore, public options: CollectionStoreOptions) {
    makeAutoObservable(this);
    this.root = root;
    this.allStoriesAreEnabled = !!options.enableAllStories;
    this.collection = deepCopy(options.collection);
    this.initialCollection = deepCopy(options.collection);
    this.isEditable = !!options.editable;
    this.layout = options.layout ?? 'standard';
    this.source = options.source ?? 'local';
    this.pagination = this.buildPaginationStore();
    this.search = this.buildSearchStore();
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

  get isLocalizable() {
    return this.options.showLocaleSelector && this.root.locale.hasAlternativeLocales;
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

  get name() {
    return this.collection.name;
  }

  get overrideTotalStoriesCount() {
    return this.searchIsEnabled ? (
      Math.max(this.totalStoriesCount, COLLECTION_SEARCH_MIN_THRESHOLD)
    ) : this.totalStoriesCount;
  }

  get page() {
    return this.pagination.selectedPage;
  }

  get searchIsEnabled() {
    return !!this.options.onSearch && (
      this.options.alwaysEnableSearch
      || this.totalStoriesCount >= COLLECTION_SEARCH_MIN_THRESHOLD
    );
  }

  get shouldDeferInitialStoriesLoad() {
    return this.search.isEmptyLandingMode && !this.search.hasSearchContent;
  }

  get shouldLazyInitWithSearchDefaults() {
    return this.searchIsEnabled && this.search.hasSearchContent;
  }

  get shouldShowStoriesList() {
    if (
      this.search.isEmptyLandingMode
      && !this.search.hasSearchContent
      && this.storiesCount === 0
    ) {
      return false;
    }
    return this.searchIsEnabled || this.totalStoriesCount > 1;
  }

  get shouldShowStoriesListHeader() {
    return this.options.showStoriesListHeader !== false && this.shouldShowStoriesList;
  }

  get shouldShowStoryId() {
    return !!this.options.showStoryId;
  }

  get storyIdActions() {
    return this.options.storyIdActions;
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

  get storiesKey() {
    return `${this.id}::${this.storyIdsKey}`;
  }

  get storiesListHeader(): string {
    return this.root.formatters.collectionStoriesListHeader;
  }

  get storyIds() {
    return this.stories.map((story) => story.id);
  }

  get storyIdsKey() {
    return this.storyIds.join(',');
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

  get typographyFormatter(): SerializableRecord {
    return {
      collection: this.collection,
      collectionStore: this,
    };
  }

  get sourceIsAPI() {
    return this.source === 'api';
  }

  buildPaginationStore() {
    return new PaginationStore(this.root, {
      onChange: this.onPageChange.bind(this),
      pageSize: this.options.pageSize || COLLECTION_STORIES_DEFAULT_PAGE_SIZE,
      selectedPage: this.options.page,
    });
  }

  buildSearchStore() {
    return new SearchStore(this.root, {
      disabled: !this.searchIsEnabled,
      enableInputSuggestions: this.options.showInputSearchSuggestions,
      enableLandingSuggestions: this.options.showLandingSearchSuggestions,
      extraFingerprint: () => JSON.stringify(this.storyStatuses),
      facets: this.collection.search_facets,
      onSearch: this.searchStories.bind(this),
      placeholder: this.root.locale.translate?.('collection.search.defaultPlaceholder')
        || 'Search collection...',
      query: this.options.searchInput ?? this.options.searchDefaultQuery,
      selectedFacets: this.options.searchDefaultFacets ?? {},
      searchOnFacetChange: true,
      startMode: this.options.searchStartMode,
      suggestions: this.options.searchSuggestions ?? this.collection.search_suggestions,
    });
  }

  changePage = async (pageNumber: number) => {
    await this.pagination.changePage(pageNumber);
  };

  getQueryParams() {
    return removeNullishValues({
      ...this.pagination.queryParams,
      ...this.search.queryParams,
      statuses: this.storyStatuses,
    });
  }

  async onPageChange() {
    await this.loadStories();
    await this.options.onPageChange?.(this.page, this);
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
      if (!this.shouldDeferInitialStoriesLoad) {
        if (this.shouldLazyInitWithSearchDefaults) {
          // Render collection shell immediately and let search loading state
          // drive cards browser UI.
          runInAction(() => {
            this.initialized = true;
          });
          this.search.submit().catch(() => {
            // submit handles loading state; failures are surfaced by API flow.
          });
          return;
        }

        await this.loadStories();
      }
    }
    runInAction(() => {
      this.initialized = true;
    });
  }

  isSlotAvailable(slot: string) {
    return !!this.slots?.[slot];
  }

  async loadStories(bypassCache: boolean = false) {
    this.startLoadingStories();
    const options = this.getQueryParams();
    const storiesAPIResponse = await this.root.api.getStories(this.id, options, bypassCache);
    runInAction(() => {
      this.setStoriesAPIResponse(storiesAPIResponse);
      this.stopLoadingStories();
    });
  }

  onStoriesAPIResponseChange(response: StoriesAPIStoriesResponse) {
    this.pagination.setLastPage(response.last_page ?? this.pagination.defaultPageNumber);
  }

  onEdit() {
    runInAction(() => {
      this.isEdited = true;
      this.saveStatus = undefined;
    });
  }

  refresh = async () => {
    const collection = await this.root.api.getCollection(this.id);
    runInAction(() => {
      this.collection = collection;
    });
    await this.loadStories();
  };

  reset() {
    runInAction(() => {
      this.collection = deepCopy(this.initialCollection);
      this.init();
      this.isEdited = false;
    });
  }

  resetPage() {
    this.pagination.reset();
  }

  async save() {
    runInAction(() => {
      this.saveStatus = 'SAVING';
    });
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
      runInAction(() => {
        this.saveStatus = 'FAILED';
      });
    }
  }

  async searchStories(bypassCache: boolean = false) {
    this.resetPage();
    await this.loadStories(bypassCache);
    await this.options.onSearch?.(this);
    return this.storiesCount;
  }

  setStoriesAPIResponse(response: StoriesAPIStoriesResponse) {
    this.storiesAPIResponse = response;
    this.onStoriesAPIResponseChange(response);
  }

  setStoryStatuses(statuses: StoriesAPIStatus[]) {
    this.storyStatuses = statuses;
  }

  startLoadingStories() {
    this.storiesAreLoading = true;
  }

  stopLoadingStories() {
    this.storiesAreLoading = false;
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
      collection_id: this.id,
      collection_name: this.name,
    });
    this.root.dom.updatePageTitle(title);
  }
}
