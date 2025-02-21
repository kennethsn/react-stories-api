import { makeAutoObservable } from 'mobx';

import { STORIES_SERVICES_BASE_URL } from '../constants';
import type {
  Collection,
  CollectionId,
  StoriesAPIStoriesResponse,
  Story,
  StoryId,
} from '../types';
import { buildURL } from '../utils';
import type RootStore from './rootStore';

export type APIStoreOptions = {
  apiKey?: string;
  baseURL?: string;
};

export default class APIStore {
  private apiKey?: string;

  private baseURL: string;

  constructor(public root: RootStore, { apiKey, baseURL }: APIStoreOptions = {}) {
    makeAutoObservable(this);
    this.apiKey = apiKey;
    this.baseURL = baseURL ?? STORIES_SERVICES_BASE_URL;
    this.root = root;
  }

  get baseQueryParams() {
    return {
      'api-key': this.apiKey,
    };
  }

  get url() {
    return `${this.baseURL}/api`;
  }

  async get<T>(path: string, queryParams?: Record<string, string | number>): Promise<T> {
    const url = buildURL(this.url, path, { ...this.baseQueryParams, ...queryParams });
    const response = await fetch(url.toString());
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.detail ?? `Error fetching data: ${response.statusText}`);
    }
    return data;
  }

  async getCollection(collectionId: CollectionId) {
    return this.get<Collection>(`/collections/${collectionId}`);
  }

  async getStories(collectionId: CollectionId) {
    return this.get<StoriesAPIStoriesResponse>(`/collections/${collectionId}/stories`);
  }

  async getStory(collectionId: CollectionId, storyId: StoryId) {
    return this.get<Story>(`/collections/${collectionId}/stories/${storyId}`);
  }
}
