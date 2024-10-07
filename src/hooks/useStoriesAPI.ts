import { useContext } from 'react';

import StoriesAPIContext, { type IStoriesAPIContext } from '../contexts/StoriesAPIContext';

export default function useStoriesAPI(): IStoriesAPIContext {
  const context = useContext(StoriesAPIContext);
  if (!context?.storyContexts) {
    throw new Error('Using Stories API Hook outside of StoriesAPIProvider or with uninitialized values');
  }
  return context;
}
