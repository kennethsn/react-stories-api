import Grid from '@mui/material/Grid2';

import useCollection from '../../hooks/useCollection';
import { buildDynamicGridSize } from '../../utils';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import styles from './CollectionFeaturedStoriesList.styles';

export default function CollectionFeaturedStoriesList() {
  const { featuredStories, featuredStoriesCount } = useCollection();
  const gridSize = buildDynamicGridSize(featuredStoriesCount);
  return (
    <Grid
      size={12}
      sx={styles.root}
    >
      <Grid
        container
        spacing={3}
        sx={styles.container}
      >
        {featuredStories.map((story) => (
          <Grid
            key={story.id}
            size={gridSize}
          >
            <Animation
              animation="fade"
              persist
            >
              <StoryCard
                buttonLabel="View Featured Story"
                story={story}
              />
            </Animation>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
