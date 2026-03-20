import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import StoryCards from '../StoryCards/StoryCards';

const CollectionStoriesList = observer(() => {
  const collection = useCollection();
  return (
    <When condition={collection.shouldShowStoriesList}>
      <StoryCards
        key={collection.storiesKey}
        enableAll={collection.allStoriesAreEnabled}
        overrideTotalCount={collection.overrideTotalStoriesCount}
        showStoryId={collection.shouldShowStoryId}
        slotComponent={collection.getSlotComponent('StoryCard')}
        stories={collection.stories}
        storyIdActions={collection.storyIdActions}
      />
    </When>
  );
});

export default CollectionStoriesList;
