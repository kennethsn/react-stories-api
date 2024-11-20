import { createContext } from 'react';

import type {
  AV,
  GoToPathFn,
  StoriesAPIFormatters,
  Story,
} from '../types';
import type { IStoryContext } from './StoryContext';

export type IStoriesAPIContext = {
  readonly av: AV | undefined;
  readonly addStoryContext: (context: IStoryContext) => void;
  readonly formatters: StoriesAPIFormatters;
  readonly getStoryContext: (storyId: Story['id']) => IStoryContext | undefined
  readonly goToPath: GoToPathFn | undefined;
  readonly isDebugging: boolean;
  readonly isMobile: boolean;
  readonly setAV: (av: AV | undefined) => void;
  readonly storyContexts: Record<Story['id'], IStoryContext>;
};

const StoriesAPIContext = createContext<IStoriesAPIContext | null>(null);

export default StoriesAPIContext;
