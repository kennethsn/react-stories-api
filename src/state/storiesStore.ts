import { makeAutoObservable } from 'mobx';

import type { Story } from '../types';
import type RootStore from './rootStore';
import StoryStore, { type StoryStoreOptions } from './storyStore';

export default class StoriesStore {
  private stories: Map<Story['id'], StoryStore>;

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

  getOrAddStory(storyOptions: StoryStoreOptions) {
    const story = this.getStory(storyOptions.story.id);
    if (story) {
      return story;
    }
    return this.addStory(storyOptions);
  }

  getStory(storyId: Story['id']) {
    return this.stories.get(storyId);
  }

  isStoryLoaded(storyId: Story['id']) {
    return this.stories.has(storyId);
  }

  loadStory(storyOptions: StoryStoreOptions) {
    if (!this.isStoryLoaded(storyOptions.story.id)) {
      this.addStory(storyOptions);
    }
  }

  removeStory(storyId: Story['id']) {
    this.stories.delete(storyId);
  }
}
