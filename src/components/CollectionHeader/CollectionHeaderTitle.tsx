import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import styles from './CollectionHeaderTitle.styles';

export default function CollectionHeaderTitle() {
  const { collection: { name, subtitle } } = useCollection();
  return (
    <Box sx={styles.title}>
      <Typography
        color="primary"
        variant="h2"
      >
        {name}
      </Typography>

      <When condition={!!subtitle}>
        <Typography
          sx={styles.subtitle}
          variant="h3"
        >
          {subtitle}
        </Typography>
      </When>
    </Box>
  );
}
