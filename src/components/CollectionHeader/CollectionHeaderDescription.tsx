import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import styles from './CollectionHeaderDescription.styles';

export default function CollectionHeaderDescription() {
  const { collection } = useCollection();
  return (
    <When condition={!!collection.description}>
      <Grid size={{ xs: 12, md: 'grow' }}>
        <Typography
          sx={styles.typography}
          variant="body1"
        >
          {collection.description}
        </Typography>
      </Grid>
    </When>
  );
}
