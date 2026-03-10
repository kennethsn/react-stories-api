import { makeAutoObservable } from 'mobx';

import defaultAPICacheOptions from '../configs/apiCacheConfig';
import { STORIES_SERVICES_BASE_URL } from '../constants';
import type {
  Collection,
  CollectionId,
  StoriesAPICollectionsQueryParams,
  StoriesAPICollectionsResponse,
  StoriesAPIStoriesQueryParams,
  StoriesAPIStoriesResponse,
  Story,
  StoryId,
} from '../types';
import { LRUCache } from '../utils/lruCache';
import { buildURL, type QueryParams } from '../utils/url';
import type RootStore from './rootStore';

export type APIStoreOptions = {
  apiKey?: string;
  baseURL?: string;
  readonly cache?: {
    readonly enableCache?: boolean;
    readonly lruSize?: number;
    /** Cache entry TTL in milliseconds. */
    readonly ttl?: number;
  };
};

export default class APIStore {
  private apiKey?: string;

  private baseURL: string;

  private responseCache: LRUCache<string, unknown> | null = null;

  constructor(
    public root: RootStore,
    { apiKey, baseURL, cache = defaultAPICacheOptions }: APIStoreOptions = {},
  ) {
    makeAutoObservable(this);
    this.apiKey = apiKey;
    this.baseURL = baseURL ?? STORIES_SERVICES_BASE_URL;
    this.root = root;

    // Initialize cache if enabled
    if (cache?.enableCache !== false) {
      const lruSize = cache?.lruSize ?? Infinity;
      const ttlMs = cache?.ttl ?? null;
      this.responseCache = new LRUCache<string, unknown>(lruSize, ttlMs);
    }
  }

  get baseQueryParams() {
    return {
      'api-key': this.apiKey,
      locale: this.root.locale.currentLocale,
    };
  }

  get url() {
    return `${this.baseURL}/api`;
  }

  clearCache() {
    this.responseCache?.clear();
  }

  /**
   * @throws {{ code: number}}
   */
  // eslint-disable-next-line class-methods-use-this
  async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw { ...data, code: response.status };
    }
    return data;
  }

  async get<T>(path: string, queryParams?: QueryParams, bypassCache: boolean = false): Promise<T> {
    const url = buildURL(this.url, path, { ...this.baseQueryParams, ...queryParams });
    const cacheKey = url.toString();

    // Check cache if not bypassed and cache is enabled
    if (!bypassCache && this.responseCache && this.responseCache.has(cacheKey)) {
      const cachedResponse = this.responseCache.get(cacheKey) as T;
      return cachedResponse;
    }

    // Fetch from API
    const data = await this.fetch<T>(cacheKey);

    // Store in cache if enabled
    if (this.responseCache) {
      this.responseCache.set(cacheKey, data);
    }

    return data;
  }

  async getCollection(collectionId: CollectionId, bypassCache: boolean = false) {
    return this.get<Collection>(`/collections/${collectionId}`, undefined, bypassCache);
  }

  async getCollections(options: StoriesAPICollectionsQueryParams, bypassCache: boolean = false) {
    return this.get<StoriesAPICollectionsResponse>('/collections', options, bypassCache);
  }

  async getStories(
    collectionId: CollectionId,
    options?: StoriesAPIStoriesQueryParams,
    bypassCache: boolean = false,
  ) {
    return this.get<StoriesAPIStoriesResponse>(
      `/collections/${collectionId}/stories`,
      options,
      bypassCache,
    );
  }

  async getStory(
    collectionId: CollectionId,
    storyId: StoryId,
    bypassCache: boolean = false,
  ) {
    return this.get<Story>(
      `/collections/${collectionId}/stories/${storyId}`,
      undefined,
      bypassCache,
    );
  }
}
