import Grid from '@mui/material/Grid2';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionHeader from '../CollectionHeader/CollectionHeader';
import CollectionSearch from '../CollectionSearch/CollectionSearch';
import CollectionSlot from '../CollectionSlot/CollectionSlot';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import TemplatedTypography from '../UI/TemplatedTypography/TemplatedTypography';
import styles from './CollectionLayout.styles';
import type { CollectionLayoutProps } from './CollectionLayout.types';

const CollectionLayout = observer(({ children }: CollectionLayoutProps) => {
  const collection = useCollection();
  const storiesListRef = useRef<HTMLDivElement>(null);
  const renderStoryCard = () => {
    if (collection.hasOneFeaturedStory) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard
            buttonLabel="View Featured Story"
            slot={(
              <CollectionSlot
                component="FeaturedStoryCard"
                story={collection.firstFeaturedStory}
              />
            )}
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
          <StoryCard
            slot={(
              <CollectionSlot
                component="StoryCard"
                story={collection.firstStory}
              />
          )}
            story={collection.firstStory}
          />
        </Animation>
      );
    }
    return undefined;
  };
  const card = renderStoryCard();
  const showListHeader = collection.shouldShowStoriesList
   && Boolean(collection.hasDescription || card);

  const handlePageChange: PaginationProps['onChange'] = async (_, page) => {
    collection.setPage(page);
    storiesListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await collection.options.onPageChange?.(page, collection);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <CollectionHeader card={card} />
      </Grid>

      <When condition={showListHeader}>
        <Grid
          ref={storiesListRef}
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

      <When condition={collection.searchIsEnabled}>
        <Grid
          size={12}
          sx={styles.searchContainer}
        >
          <CollectionSearch />
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

      <When condition={collection.shouldShowPagination}>
        <Grid
          size={12}
          sx={styles.paginationContainer}
        >
          <Pagination
            count={collection.lastPage}
            onChange={handlePageChange}
            page={collection.page}
          />
        </Grid>
      </When>
    </Grid>
  );
});

export default CollectionLayout;
