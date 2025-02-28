import { makeAutoObservable } from 'mobx';

import type { Collection, CollectionId } from '../types';
import CollectionStore, { type CollectionStoreOptions } from './collectionStore';
import type RootStore from './rootStore';

export default class CollectionsStore {
  private collections: Map<Collection['id'], CollectionStore>;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.collections = new Map();
  }

  get storyIds() {
    return Array.from(this.collections.keys());
  }

  addCollection(collection: Collection, options: Omit<CollectionStoreOptions, 'collection'>) {
    const collectionStore = new CollectionStore(this.root, {
      ...options,
      collection,
    });
    collectionStore.init();
    this.collections.set(collection.id, collectionStore);
  }

  getCollection(collectionId: CollectionId) {
    return this.collections.get(collectionId);
  }

  hasCollection(collectionId: CollectionId) {
    return this.collections.has(collectionId);
  }

  async loadCollection(
    collectionId: CollectionId,
    options: Omit<CollectionStoreOptions, 'collection' | 'source'> = {},
  ) {
    if (this.hasCollection(collectionId)) {
      return;
    }
    // TODO: handle error
    const collection = await this.root.api.getCollection(collectionId);
    if (collection) {
      this.addCollection(collection, { ...options, source: 'api' });
    }
  }

  removeCollection(collectionId: CollectionId) {
    this.collections.delete(collectionId);
  }
}
