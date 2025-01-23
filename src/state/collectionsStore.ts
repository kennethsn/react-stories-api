import { makeAutoObservable } from 'mobx';

import type { Collection } from '../types';
import CollectionStore from './collectionStore';
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

  addCollection(collection: Collection) {
    const collectionStore = new CollectionStore(this.root, collection);
    this.collections.set(collection.id, collectionStore);
  }

  getCollection(collectionId: Collection['id']) {
    return this.collections.get(collectionId);
  }

  removeCollection(collectionId: Collection['id']) {
    this.collections.delete(collectionId);
  }
}
