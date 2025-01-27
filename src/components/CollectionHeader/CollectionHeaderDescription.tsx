import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionTypography from '../CollectionTypography/CollectionTypography';
import styles from './CollectionHeaderDescription.styles';

const CollectionHeaderDescription = observer(() => {
  const collection = useCollection();
  return (
    <When condition={collection.hasDescription}>
      <Grid size={{ xs: 12, md: 'grow' }}>
        <CollectionTypography
          field="description"
          sx={styles.typography}
          variant="body1"
        />
      </Grid>
    </When>
  );
});

export default CollectionHeaderDescription;
