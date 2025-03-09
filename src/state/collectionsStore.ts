import { makeAutoObservable } from 'mobx';

import type {
  Collection,
  CollectionId,
  ProjectId,
  StoriesAPIStatus,
} from '../types';
import CollectionStore, { type CollectionStoreOptions } from './collectionStore';
import type RootStore from './rootStore';

type GetCollectionsListOptions = {
  readonly featured?: boolean;
  readonly projectId?: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
};

export default class CollectionsStore {
  private collections: Map<CollectionId, { isLoading: boolean, collection?: CollectionStore }>;

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
  ) {
    const collectionStore = new CollectionStore(this.root, {
      ...options,
      collection,
    });
    if (loadStories) {
      collectionStore.init();
    }
    this.collections.set(collection.id, { isLoading: false, collection: collectionStore });
    return collectionStore;
  }

  getCollection(collectionId: CollectionId) {
    return this.collections.get(collectionId)?.collection;
  }

  getCollectionRouteParams() {
    const formatter = this.root.formatters.collectionPath;
    const params = this.root.dom.getRouteParams(formatter);
    return {
      ...params,
      collectionId: params.collectionId ? Number(params.collectionId) : undefined,
    };
  }

  hasCollection(collectionId: CollectionId) {
    return this.collections.has(collectionId);
  }

  isCollectionLoading(collectionId: CollectionId) {
    return this.collections.get(collectionId)?.isLoading;
  }

  async loadCollection(
    collectionId: CollectionId,
    options: Omit<CollectionStoreOptions, 'collection' | 'source'> = {},
    callback?: (collectionStore: CollectionStore) => void,
  ) {
    if (this.isCollectionLoading(collectionId)) {
      return;
    }
    let collectionStore: CollectionStore;
    if (this.hasCollection(collectionId)) {
      collectionStore = this.getCollection(collectionId)!;
      if (!collectionStore.initialized) {
        collectionStore.init();
        this.collections.set(collectionId, { isLoading: false, collection: collectionStore });
      }
    } else {
      this.collections.set(collectionId, { isLoading: true, collection: undefined });
      // TODO: handle error
      const collection = await this.root.api.getCollection(collectionId);
      collectionStore = this.addCollection(collection, { ...options, source: 'api' });
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
    this.collectionsListCache.set(key, { isLoading: true });
    const { collections } = await this.root.api.getCollections({
      featured: options.featured,
      project_id: projectId,
      statuses: options.statuses,
    });
    collections.forEach((collection) => this.addCollection(collection, { source: 'api' }, false));
    const collectionIds = collections.map(({ id }) => id);
    this.collectionsListCache.set(key, { isLoading: false, collectionIds });
  }

  removeCollection(collectionId: CollectionId) {
    this.collections.delete(collectionId);
  }
}
