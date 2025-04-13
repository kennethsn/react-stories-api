import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { Case, Switch } from 'react-if';
import { useSearchParams } from 'react-router-dom';

import useFormatters from '../../hooks/useFormatters';
import useStories from '../../hooks/useStories';
import { StoryProvider } from '../../providers';
import type MomentStore from '../../state/momentStore';
import StoryError from '../StoryError/StoryError';
import StoryLoader from '../StoryLoader/StoryLoader';
import type { StoriesAPIStoryProps } from './StoriesAPIStory.types';

// TODO: API Task handling

const Story = lazy(() => import('../Story/Story'));

const StoriesAPIStory = observer((props: StoriesAPIStoryProps) => {
  const {
    connectRouter,
    defaultMomentId,
    editable,
    fullscreen: isFullscreen,
    onChange,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const formatters = useFormatters();
  const stories = useStories();
  let { collectionId, storyId } = props;
  if (connectRouter) {
    const routeParams = stories.getStoryRouteParams();
    collectionId = routeParams.collectionId;
    storyId = routeParams.storyId;
  }
  if (!storyId || !collectionId) {
    throw new Error('Story or Collection not found.');
  }
  const defaultActiveMomentId = (connectRouter ? (
    searchParams.get(formatters.momentQueryParamKey) ?? defaultMomentId
  ) : (
    defaultMomentId
  ));

  const handleChange = (moment: MomentStore) => {
    onChange?.(moment);
    if (connectRouter) {
      setSearchParams(
        { [formatters.momentQueryParamKey]: moment.id },
        { replace: true },
      );
    }
  };

  useEffect(() => autorun(() => {
    stories.fetchAndLoadStory(collectionId, storyId, {
      ...props,
      connectRouter,
      defaultMomentId: defaultActiveMomentId,
      onChange: handleChange,
    }, (story) => {
      if (connectRouter) {
        story?.updatePageTitle();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [collectionId, storyId, editable]);

  const story = stories.getStory(storyId!);

  const loader = <StoryLoader isFullscreen={isFullscreen} />;

  return (
    <Suspense fallback={loader}>
      <Switch>
        <Case condition={stories.isStoryLoaded(storyId)}>
          {() => (
            <StoryProvider story={story!.story}>
              <Story />
            </StoryProvider>
          )}
        </Case>

        <Case condition={stories.isStoryError(storyId)}>
          <StoryError
            collectionId={collectionId}
            isFullscreen={isFullscreen}
            storyId={storyId}
          />
        </Case>

        <Case condition={stories.isStoryLoading(storyId)}>
          {loader}
        </Case>
      </Switch>
    </Suspense>
  );
});

export default StoriesAPIStory;
