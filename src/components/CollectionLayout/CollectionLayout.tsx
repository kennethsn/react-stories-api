import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionHeader from '../CollectionHeader/CollectionHeader';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import TemplatedTypography from '../UI/TemplatedTypography/TemplatedTypography';
import styles from './CollectionLayout.styles';
import type { CollectionLayoutProps } from './CollectionLayout.types';

const CollectionLayout = observer(({ children }: CollectionLayoutProps) => {
  const collection = useCollection();
  const renderStoryCard = () => {
    if (collection.hasOneFeaturedStory) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard
            buttonLabel="View Featured Story"
            story={collection.firstFeaturedStory}
          />
        </Animation>
      );
    }
    if (collection.hasOneStory) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard story={collection.firstStory} />
        </Animation>
      );
    }
    return undefined;
  };
  const card = renderStoryCard();
  const showListHeader = collection.shouldShowStoriesList
   && Boolean(collection.hasDescription || card);

  return (
    <Grid container>
      <Grid size={12}>
        <CollectionHeader card={card} />
      </Grid>

      <When condition={showListHeader}>
        <Grid
          size={12}
          sx={styles.storiesListHeader}
        >
          <TemplatedTypography
            color="textSecondary"
            sx={styles.storiesSectionHeader}
            values={{ collectionName: collection.name }}
            valueSx={styles.storiesSectionHeaderValue}
            variant="h4"
          >
            {collection.storiesListHeader}
          </TemplatedTypography>
        </Grid>
      </When>

      <When condition={collection.shouldShowStoriesList}>
        <Grid
          size={12}
          sx={styles.storiesSection}
        >
          {children}
        </Grid>
      </When>
    </Grid>
  );
});

export default CollectionLayout;
