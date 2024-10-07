import { useContext } from 'react';

import StoryContext, { type IStoryContext } from '../contexts/StoryContext';

export default function useStory(): IStoryContext {
  const context = useContext(StoryContext);
  if (!context?.story) {
    throw new Error('Using Story Hook outside of StoryProvider or with uninitialized story');
  }
  return context;
}
