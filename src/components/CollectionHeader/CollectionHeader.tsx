import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionFeaturedStoriesList
  from '../CollectionFeaturedStoriesList/CollectionFeaturedStoriesList';
import styles from './CollectionHeader.styles';
import type { CollectionHeaderProps } from './CollectionHeader.types';
import CollectionHeaderDescription from './CollectionHeaderDescription';
import CollectionHeaderTitle from './CollectionHeaderTitle';
import CollectionHeaderTitleColumn from './CollectionHeaderTitleColumn';

export default function CollectionHeader({ card }: CollectionHeaderProps) {
  const { collection, collectionHasFeaturedStories } = useCollection();
  const showCard = !!card;
  const showFeaturedStoriesList = collectionHasFeaturedStories && !showCard;
  const showTitleAsColumn = showCard && !collection.description;
  const showTitleAsRow = !showTitleAsColumn;
  return (
    <Box sx={styles.container(collection.image)}>
      <When condition={showTitleAsRow}>
        <CollectionHeaderTitle />
      </When>

      <Grid
        container
        spacing={showCard ? { xs: 2, md: 4, lg: 9 } : 3}
        sx={styles.content}
      >
        <When condition={showTitleAsColumn}>
          <CollectionHeaderTitleColumn />
        </When>

        <CollectionHeaderDescription />

        <When condition={showCard}>
          <Grid size={{ xs: 12, md: 5 }}>
            {card}
          </Grid>
        </When>

        <When condition={showFeaturedStoriesList}>
          <CollectionFeaturedStoriesList />
        </When>
      </Grid>
    </Box>
  );
}
