import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import useCollection from '../../hooks/useCollection';
import useLocale from '../../hooks/useLocale';
import CollectionSlot from '../CollectionSlot/CollectionSlot';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import styles from './CollectionFeaturedStoriesList.styles';

const CollectionFeaturedStoriesList = observer(() => {
  const { t } = useLocale();
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
                buttonLabel={t('collection.featuredStory.buttonLabel')}
                isDisabled={collection.allStoriesAreEnabled ? false : undefined}
                slot={(
                  <CollectionSlot
                    component="FeaturedStoryCard"
                    story={story}
                  />
                )}
                story={story}
                sx={styles.storyCard}
              />
            </Animation>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export default CollectionFeaturedStoriesList;
