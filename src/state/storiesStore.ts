import { makeAutoObservable, runInAction } from 'mobx';

import type { CollectionId, StoryId } from '../types';
import type RootStore from './rootStore';
import StoryStore, { type StoryStoreOptions } from './storyStore';

type StoryFetchState = {
  readonly errorCode?: number;
  readonly status: 'loading' | 'error' | 'success';
};

// TODO: CollectionId needs to be added to all the lookups

export default class StoriesStore {
  private stories: Map<StoryId, StoryStore>;

  private storyFetchStates: Map<StoryId, StoryFetchState>;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.stories = new Map();
    this.storyFetchStates = new Map();
  }

  get storyIds() {
    return Array.from(this.stories.keys());
  }

  addStory(storyOptions: StoryStoreOptions) {
    const story = new StoryStore(this.root, storyOptions);
    this.stories.set(story.id, story);
    return story;
  }

  async fetchAndLoadStory(
    collectionId: CollectionId,
    storyId: StoryId,
    storyOptions: Omit<StoryStoreOptions, 'story'>,
    callback?: (story: StoryStore) => void,
  ) {
    if (this.storyHasFetchStatus(storyId)) {
      return;
    }
    runInAction(() => {
      this.updateStoryFetchState(storyId, { status: 'loading' });
    });
    try {
      const story = await this.root.api.getStory(collectionId, storyId);
      const store = this.loadStory({ ...storyOptions, story });
      runInAction(() => {
        this.updateStoryFetchState(storyId, { status: 'success' });
      });
      callback?.(store);
    } catch (error) {
      const errorCode = (error as { code: number }).code ?? 500;
      runInAction(() => {
        this.updateStoryFetchState(storyId, { errorCode, status: 'error' });
      });
      throw error;
    }
  }

  getOrAddStory(storyOptions: StoryStoreOptions) {
    const story = this.getStory(storyOptions.story.id);
    if (story) {
      return story;
    }
    return this.addStory(storyOptions);
  }

  getStory(storyId: StoryId) {
    return this.stories.get(storyId);
  }

  getStoryFetchErrorCode(storyId: StoryId) {
    return this.getStoryFetchState(storyId)?.errorCode;
  }

  getStoryFetchState(storyId: StoryId) {
    return this.storyFetchStates.get(storyId);
  }

  getStoryFetchStatus(storyId: StoryId) {
    return this.getStoryFetchState(storyId)?.status;
  }

  getStoryRouteParams(): { collectionId?: CollectionId; storyId?: StoryId } {
    const formatter = this.root.formatters.storyPath;
    const params = this.root.dom.getRouteParams(formatter);
    return {
      ...params,
      collectionId: params.collectionId ? Number(params.collectionId) : undefined,
    };
  }

  isStoryError(storyId: StoryId) {
    return this.getStoryFetchStatus(storyId) === 'error';
  }

  isStoryLoaded(storyId: StoryId) {
    return this.stories.has(storyId);
  }

  isStoryLoading(storyId: StoryId) {
    return this.getStoryFetchStatus(storyId) === 'loading';
  }

  loadStory(storyOptions: StoryStoreOptions) {
    if (!this.isStoryLoaded(storyOptions.story.id)) {
      return this.addStory(storyOptions);
    }
    return this.getStory(storyOptions.story.id)!;
  }

  removeStory(storyId: StoryId) {
    this.stories.delete(storyId);
  }

  storyHasFetchStatus(storyId: StoryId) {
    return this.storyFetchStates.has(storyId);
  }

  updateStoryFetchState(storyId: StoryId, fetchState: StoryFetchState) {
    this.storyFetchStates.set(storyId, fetchState);
  }
}
