// KSN TODO: Search support
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import CollectionsList from '../CollectionsList/CollectionsList';
import CollectionsSections from '../CollectionsSections/CollectionsSections';
import type { CollectionsProps } from './Collections.types';

const Collections = observer(({
  collectionPathFormatter,
  collections,
  enableAllCollections,
  layout,
  sx,
}: CollectionsProps) => (
  <Box sx={sx}>
    <If condition={layout === 'sections'}>
      <Then>
        <CollectionsSections
          collectionPathFormatter={collectionPathFormatter}
          collections={collections}
          enableAllCollections={enableAllCollections}
        />
      </Then>

      <Else>
        <CollectionsList
          collectionPathFormatter={collectionPathFormatter}
          collections={collections}
          enableAllCollections={enableAllCollections}
        />
      </Else>
    </If>
  </Box>
));

export default Collections;
