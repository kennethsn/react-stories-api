import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionActions from '../CollectionActions/CollectionActions';
import CollectionFeaturedStoriesList
  from '../CollectionFeaturedStoriesList/CollectionFeaturedStoriesList';
import styles from './CollectionHeader.styles';
import type { CollectionHeaderProps } from './CollectionHeader.types';
import CollectionHeaderDescription from './CollectionHeaderDescription';
import CollectionHeaderTitle from './CollectionHeaderTitle';
import CollectionHeaderTitleColumn from './CollectionHeaderTitleColumn';

const CollectionHeader = observer(({ card }: CollectionHeaderProps) => {
  const collection = useCollection();
  const showCard = !!card;
  const showFeaturedStoriesList = !showCard && collection.hasFeaturedStories;
  const showTitleAsColumn = showCard && collection.doesNotHaveDescription;
  const showTitleAsRow = !showTitleAsColumn;
  const showSecondRow = (
    showTitleAsColumn || collection.hasDescription || showCard || showFeaturedStoriesList
  );
  return (
    <Box sx={styles.container(collection.image)}>
      <CollectionActions />

      <When condition={showTitleAsRow}>
        <CollectionHeaderTitle />
      </When>

      <Grid
        container
        spacing={showCard ? { xs: 2, md: 4, lg: 9 } : 3}
        sx={styles.content(showSecondRow)}
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
});

export default CollectionHeader;
