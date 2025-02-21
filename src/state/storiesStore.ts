import { makeAutoObservable } from 'mobx';

import type { CollectionId, StoryId } from '../types';
import type RootStore from './rootStore';
import StoryStore, { type StoryStoreOptions } from './storyStore';

export default class StoriesStore {
  private stories: Map<StoryId, StoryStore>;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.stories = new Map();
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
  ) {
    // TODO: handle loading
    // TODO: handle error
    const story = await this.fetchStory(collectionId, storyId);
    if (story) {
      this.loadStory({ ...storyOptions, story });
    }
  }

  fetchStory(collectionId: CollectionId, storyId: StoryId) {
    return this.root.api.getStory(collectionId, storyId);
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

  isStoryLoaded(storyId: StoryId) {
    return this.stories.has(storyId);
  }

  loadStory(storyOptions: StoryStoreOptions) {
    if (!this.isStoryLoaded(storyOptions.story.id)) {
      this.addStory(storyOptions);
    }
  }

  removeStory(storyId: StoryId) {
    this.stories.delete(storyId);
  }
}
