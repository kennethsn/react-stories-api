import { useContext } from 'react';

import StoryContext from '../contexts/StoryContext';

export default function useStory() {
  const context = useContext(StoryContext);
  if (!context?.story) {
    throw new Error('Using Story Hook outside of StoryProvider or with uninitialized story');
  }
  return context;
}
