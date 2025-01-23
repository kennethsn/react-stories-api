import { createContext } from 'react';

import type StoryStore from '../state/storyStore';

export type IStoryContext = StoryStore;

const StoryContext = createContext<StoryStore | null>(null);

export default StoryContext;
