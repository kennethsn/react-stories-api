import { observer } from 'mobx-react-lite';

import useCollection from '../../hooks/useCollection';
import StoryCards from '../StoryCards/StoryCards';

const CollectionStoriesList = observer(() => {
  const collection = useCollection();
  return (
    <StoryCards
      overrideTotalCount={collection.totalStoriesCount}
      slotComponent={collection.getSlotComponent('StoryCard')}
      stories={collection.stories}
    />
  );
});

export default CollectionStoriesList;
