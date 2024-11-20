import { Masonry } from '@mui/lab';

import useCollection from '../../hooks/useCollection';
import { getRandomNumber } from '../../utils';
import { buildDynamicGridColumns } from '../../utils/grid';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import styles from './CollectionStoriesList.styles';

export default function CollectionStoriesList() {
  const { stories, totalStoriesCount } = useCollection();
  const columns = buildDynamicGridColumns(totalStoriesCount, { xs: 2 });
  return (
    <Masonry
      columns={columns}
      sx={styles.root}
    >
      {stories.map((story) => (
        <Animation
          key={story.id}
          animation="fadeUp"
          persist
          speed={getRandomNumber(600, 1500)}
        >
          <StoryCard
            // KSN TODO: make configurable
            buttonLabel="Learn More"
            story={story}
            sx={styles.storyCard}
          />
        </Animation>
      ))}
    </Masonry>
  );
}
