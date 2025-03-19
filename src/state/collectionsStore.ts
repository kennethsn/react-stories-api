import { makeAutoObservable, runInAction } from 'mobx';

import type {
  Collection,
  CollectionId,
  ProjectId,
  StoriesAPIStatus,
} from '../types';
import { formatString } from '../utils';
import CollectionStore, { type CollectionStoreOptions } from './collectionStore';
import type RootStore from './rootStore';

type CollectionCacheKey = CollectionId | string;
type GetCollectionsListOptions = {
  readonly featured?: boolean;
  readonly projectId?: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
};
const buildLookupKey = (collectionId: CollectionId | string, cacheKey?: string) => (cacheKey ? (
  formatString(cacheKey, { collectionId })
) : collectionId);

export default class CollectionsStore {
  private collections: Map<CollectionCacheKey, {
    readonly isLoading: boolean,
    readonly collection?: CollectionStore,
  }>;

  private collectionsListCache: Map<string, { isLoading: boolean, collectionIds?: CollectionId[] }>;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.collections = new Map();
    this.collectionsListCache = new Map();
  }

  get getCollectionsList() {
    return (options: GetCollectionsListOptions) => {
      const key = JSON.stringify(options);
      const collectionIds = this.collectionsListCache.get(key)?.collectionIds ?? [];
      return collectionIds.map((collectionId) => this.getCollection(collectionId)!);
    };
  }

  get isCollectionsListLoading() {
    return (options: GetCollectionsListOptions) => {
      const key = JSON.stringify(options);
      return !!this.collectionsListCache.get(key)?.isLoading;
    };
  }

  get storyIds() {
    return Array.from(this.collections.keys());
  }

  addCollection(
    collection: Collection,
    options: Omit<CollectionStoreOptions, 'collection'>,
    loadStories: boolean = true,
    cacheKey?: string,
  ) {
    const key = buildLookupKey(collection.id, cacheKey);
    const collectionStore = new CollectionStore(this.root, {
      ...options,
      collection,
    });
    if (loadStories) {
      collectionStore.init();
    }
    this.collections.set(key, { isLoading: false, collection: collectionStore });
    return collectionStore;
  }

  getCollection(collectionId: CollectionCacheKey, cacheKey?: string) {
    const key = buildLookupKey(collectionId, cacheKey);
    return this.collections.get(key)?.collection;
  }

  getCollectionRouteParams() {
    const formatter = this.root.formatters.collectionPath;
    const params = this.root.dom.getRouteParams(formatter);
    return {
      ...params,
      collectionId: params.collectionId ? Number(params.collectionId) : undefined,
    };
  }

  hasCollection(collectionId: CollectionCacheKey) {
    return this.collections.has(collectionId);
  }

  isCollectionLoading(collectionId: CollectionCacheKey) {
    return this.collections.get(collectionId)?.isLoading;
  }

  async loadCollection(
    collectionId: CollectionId,
    options: Omit<CollectionStoreOptions, 'collection' | 'source'> = {},
    callback?: (collectionStore: CollectionStore) => void,
    cacheKey?: string,
  ) {
    const key = buildLookupKey(collectionId, cacheKey);
    if (this.isCollectionLoading(key)) {
      return;
    }
    let collectionStore: CollectionStore;
    if (this.hasCollection(key)) {
      collectionStore = this.getCollection(key)!;
      if (!collectionStore.initialized) {
        runInAction(() => {
          collectionStore.init();
          this.collections.set(key, { isLoading: false, collection: collectionStore });
        });
      }
    } else {
      runInAction(() => {
        this.collections.set(key, { isLoading: true, collection: undefined });
      });
      // TODO: handle error
      const collection = await this.root.api.getCollection(collectionId);
      collectionStore = this.addCollection(collection, { ...options, source: 'api' }, true, cacheKey);
    }
    callback?.(collectionStore);
  }

  async loadCollections(options: {
    projectId?: ProjectId,
    statuses?: StoriesAPIStatus[],
    featured?: boolean,
  }) {
    const key = JSON.stringify(options);
    if (this.collectionsListCache.has(key)) {
      return;
    }
    const projectId = options.projectId ?? this.root.projectId;
    if (!projectId) {
      throw new Error('Project ID is required to load collections.');
    }
    runInAction(() => {
      this.collectionsListCache.set(key, { isLoading: true });
    });
    const { collections } = await this.root.api.getCollections({
      featured: options.featured,
      project_id: projectId,
      statuses: options.statuses,
    });
    collections.forEach((collection) => this.addCollection(collection, { source: 'api' }, false));
    const collectionIds = collections.map(({ id }) => id);
    runInAction(() => {
      this.collectionsListCache.set(key, { isLoading: false, collectionIds });
    });
  }

  removeCollection(collectionId: CollectionId) {
    this.collections.delete(collectionId);
  }
}
