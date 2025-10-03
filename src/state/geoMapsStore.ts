import { makeAutoObservable } from 'mobx';

import type { GeoMapId } from '../types';
import { formatString } from '../utils/string';
import GeoMapStore, { GeoMapStoreOptions } from './geoMapStore';
import type RootStore from './rootStore';

type GeoMapCacheKey = string;

const buildLookupKey = (geoMapId: GeoMapId, cacheKey?: GeoMapCacheKey) => (cacheKey ? (
  formatString(cacheKey, { geoMapId })
) : geoMapId);

export default class GeoMapsStore {
  private geoMaps: Map<GeoMapCacheKey, GeoMapStore>;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.geoMaps = new Map();
  }

  get geoMapIds() {
    return Array.from(this.geoMaps.keys());
  }

  addGeoMap(
    options: GeoMapStoreOptions,
    cacheKey?: GeoMapCacheKey,
  ) {
    const { geoMap } = options;
    const key = buildLookupKey(geoMap.id, cacheKey);
    const geoMapStore = new GeoMapStore(this.root, options);
    this.geoMaps.set(key, geoMapStore);
    return geoMapStore;
  }

  getGeoMap(geoMapId: GeoMapCacheKey, cacheKey?: GeoMapCacheKey) {
    const key = buildLookupKey(geoMapId, cacheKey);
    return this.geoMaps.get(key);
  }

  loadGeoMap(
    options: GeoMapStoreOptions,
    cacheKey?: string,
  ) {
    return this.getGeoMap(options.geoMap.id, cacheKey) || this.addGeoMap(options, cacheKey);
  }

  removeGeoMap(geoMapId: GeoMapId) {
    this.geoMaps.delete(geoMapId);
  }
}
