import useCollection from '../../hooks/useCollection';
import StoryCards from '../StoryCards/StoryCards';

export default function CollectionStoriesList() {
  const { stories, totalStoriesCount } = useCollection();
  return (
    <StoryCards
      overrideTotalCount={totalStoriesCount}
      stories={stories}
    />
  );
}
