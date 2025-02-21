import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { useParams } from 'react-router-dom';

import useStories from '../../hooks/useStories';
import type { StoriesAPIStoryProps } from './StoriesAPIStory.types';

// TODO: No Story Data or Error
// TODO: API Task handling
// TODO: Loading UI

const Story = lazy(() => import('../Story/Story'));

const StoriesAPIStory = observer(({
  connectRouter,
  ...props
}: StoriesAPIStoryProps) => {
  const routeParams = useParams<{ collectionId: string, storyId: string }>();
  const stories = useStories();
  const collectionId = connectRouter ? Number(routeParams.collectionId) : props.collectionId!;
  const storyId = connectRouter ? routeParams.storyId : props.storyId;
  if (!storyId || !collectionId) {
    throw new Error('Story or Collection not found.');
  }
  useEffect(() => autorun(() => {
    stories.fetchAndLoadStory(collectionId, storyId, props);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collectionId, storyId, props.editable]);

  const story = stories.getStory(storyId!);
  return (
    <Suspense fallback={<div>{/* TODO: Loader & Error handling */}</div>}>
      <If condition={!!story}>
        <Then>
          {() => (
            <Story
              connectRouter={connectRouter}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              story={story!.story}
            />
          )}
        </Then>

        <Else>
          {/* TODO: Loader & Error handling */}
        </Else>
      </If>
    </Suspense>
  );
});

export default StoriesAPIStory;
