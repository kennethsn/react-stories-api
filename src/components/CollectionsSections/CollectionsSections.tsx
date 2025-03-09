import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';

import CollectionSection from '../CollectionSection/CollectionSection';
import type { CollectionsSectionsProps } from './CollectionsSections.types';

const CollectionsSections = observer(({
  collections,
  enableAllCollections,
}: CollectionsSectionsProps) => (
  <Grid
    container
    spacing={3}
  >
    {collections.map((collection) => (
      <Grid
        key={collection.id}
        size={12}
      >
        <CollectionSection
          collection={collection}
          enabled={enableAllCollections}
        />
      </Grid>
    ))}
  </Grid>
));

export default CollectionsSections;
