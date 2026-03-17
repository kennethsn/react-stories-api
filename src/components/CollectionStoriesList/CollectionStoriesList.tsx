import { observer } from 'mobx-react-lite';

import useCollection from '../../hooks/useCollection';
import StoryCards from '../StoryCards/StoryCards';

const CollectionStoriesList = observer(() => {
  const collection = useCollection();
  return (
    <StoryCards
      key={collection.storiesKey}
      enableAll={collection.allStoriesAreEnabled}
      overrideTotalCount={collection.overrideTotalStoriesCount}
      showStoryId={collection.shouldShowStoryId}
      slotComponent={collection.getSlotComponent('StoryCard')}
      stories={collection.stories}
      storyIdActions={collection.storyIdActions}
    />
  );
});

export default CollectionStoriesList;
