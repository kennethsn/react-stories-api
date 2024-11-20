import Grid from '@mui/material/Grid2';

import CollectionHeaderTitle from './CollectionHeaderTitle';
import styles from './CollectionHeaderTitleColumn.styles';

export default function CollectionHeaderTitleColumn() {
  return (
    <Grid
      size={{ xs: 12, md: 'grow' }}
      sx={styles.root}
    >
      <CollectionHeaderTitle />
    </Grid>
  );
}
