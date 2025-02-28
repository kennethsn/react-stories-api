import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { When } from 'react-if';

import type { StoryProps } from '../components/Story/Story.types';
import StoryContext from '../contexts/StoryContext';
import useStoriesAPI from '../hooks/useStoriesAPI';
import type StoryStore from '../state/storyStore';
import type { Story } from '../types';

type StoryProviderProps = Omit<StoryProps, 'story'> & PropsWithChildren & {
  readonly story?: Story;
  readonly store?: StoryStore
};

const StoryProvider = observer(({
  children,
  store,
  ...props
}: StoryProviderProps) => {
  const { story } = props;
  if (!story && !store) {
    throw new Error('Story not found.');
  }
  const { isDebugging, stories } = useStoriesAPI();

  useEffect(() => autorun(() => {
    if (store) return;
    if (isDebugging) {
      // eslint-disable-next-line no-console
      console.debug('StoryProvider useEffect called');
    }

    stories.loadStory({ story: story!, ...props });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    props.onChange,
    props.editable,
    props.story,
  ]);
  const storyStore = store ?? stories.getStory(story!.id);
  return (
    <When condition={!!storyStore}>
      <StoryContext.Provider value={storyStore!}>
        {children}
      </StoryContext.Provider>
    </When>
  );
});

export default StoryProvider;
