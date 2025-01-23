import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import useCollection from '../../hooks/useCollection';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import styles from './CollectionFeaturedStoriesList.styles';

const CollectionFeaturedStoriesList = observer(() => {
  const collection = useCollection();
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
        {collection.featuredStories.map((story) => (
          <Grid
            key={story.id}
            size={collection.gridSize}
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
});

export default CollectionFeaturedStoriesList;
