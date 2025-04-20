import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import CollectionsListItem from '../CollectionsListItem/CollectionsListItem';
import styles from './CollectionsList.styles';
import type { CollectionsListProps } from './CollectionsList.types';

const CollectionsList = observer(({
  collectionPathFormatter,
  collections,
  enableAllCollections,
}: CollectionsListProps) => (
  <Grid
    container
    spacing={3}
    sx={styles.root}
  >
    {collections.map((collection) => (
      <Grid
        key={collection.id}
        size={12}
      >
        <CollectionsListItem
          collection={collection}
          collectionPathFormatter={collectionPathFormatter}
          enabled={enableAllCollections}
        />
      </Grid>
    ))}
  </Grid>
));

export default CollectionsList;
