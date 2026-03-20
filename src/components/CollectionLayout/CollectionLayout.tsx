import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import useLocale from '../../hooks/useLocale';
import CollectionHeader from '../CollectionHeader/CollectionHeader';
import CollectionSlot from '../CollectionSlot/CollectionSlot';
import StoryCard from '../StoryCard/StoryCard';
import Animation from '../UI/Animation/Animation';
import CardsBrowser from '../UI/CardsBrowser/CardsBrowser';
import TemplatedTypography from '../UI/TemplatedTypography/TemplatedTypography';
import styles from './CollectionLayout.styles';
import type { CollectionLayoutProps } from './CollectionLayout.types';

const CollectionLayout = observer(({ children }: CollectionLayoutProps) => {
  const { t } = useLocale();
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
            buttonLabel={t('collection.featuredStory.buttonLabel')}
            isDisabled={collection.allStoriesAreEnabled ? false : undefined}
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
    if (collection.hasOneStory && collection.firstStory) {
      return (
        <Animation
          animation="fadeUpLeft"
          persist
        >
          <StoryCard
            isDisabled={collection.allStoriesAreEnabled ? false : undefined}
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
  const showListHeader = collection.shouldShowStoriesListHeader
    && Boolean(collection.hasDescription || card);

  return (
    <Grid
      className="StoriesAPICollection"
      container
      sx={styles.root}
    >
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
            values={{ collection_name: collection.name }}
            valueSx={styles.storiesSectionHeaderValue}
            variant="h4"
          >
            {collection.storiesListHeader}
          </TemplatedTypography>
        </Grid>
      </When>

      <Grid size={12}>
        <CardsBrowser
          layout={collection.layout}
          pagination={collection.pagination}
          search={collection.search}
          slots={{
            CardsBrowserSearch: (
              <CollectionSlot component="CollectionSearch" />
            ),
          }}
        >
          {children}
        </CardsBrowser>
      </Grid>
    </Grid>
  );
});

export default CollectionLayout;
