import { createContext } from 'react';

import type StoryStore from '../state/storyStore';

export type IStoryContext = StoryStore;

const StoryContext = createContext<IStoryContext | null>(null);

export default StoryContext;
