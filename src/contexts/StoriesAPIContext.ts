import { createContext } from 'react';

import type { Story } from '../types';
import type { IStoryContext } from './StoryContext';

export interface IStoriesAPIContext {
  addStoryContext: (context: IStoryContext) => void;
  isDebugging: boolean;
  isMobile: boolean;
  getStoryContext: (storyId: Story['id']) => IStoryContext | undefined
  storyContexts: Record<Story['id'], IStoryContext>;
}

const StoriesAPIContext = createContext<IStoriesAPIContext | null>(null);

export default StoriesAPIContext;
