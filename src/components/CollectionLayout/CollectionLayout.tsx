import Grid from '@mui/material/Grid2';
import { When } from 'react-if';

import { useStoriesAPI } from '../../hooks';
import useCollection from '../../hooks/useCollection';
import CollectionHeader from '../CollectionHeader/CollectionHeader';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import TemplatedTypography from '../UI/TemplatedTypography/TemplatedTypography';
import styles from './CollectionLayout.styles';
import type { CollectionLayoutProps } from './CollectionLayout.types';

export default function CollectionLayout({ children }: CollectionLayoutProps) {
  const { formatters: { collectionStoriesListHeader } } = useStoriesAPI();
  const {
    collection,
    featuredStories,
    featuredStoriesCount,
    totalStoriesCount,
    stories,
  } = useCollection();
  const showStoriesList = totalStoriesCount > 1;
  const renderStoryCard = () => {
    if (featuredStoriesCount === 1) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard
            buttonLabel="View Featured Story"
            story={featuredStories[0]}
          />
        </Animation>
      );
    }
    if (totalStoriesCount === 1) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard story={stories[0]} />
        </Animation>
      );
    }
    return undefined;
  };
  const card = renderStoryCard();
  const showListHeader = showStoriesList && Boolean(collection.description || card);

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
            {collectionStoriesListHeader}
          </TemplatedTypography>
        </Grid>
      </When>

      <When condition={showStoriesList}>
        <Grid
          size={12}
          sx={styles.storiesSection}
        >
          {children}
        </Grid>
      </When>
    </Grid>
  );
}
