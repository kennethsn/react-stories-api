import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import styles from './CollectionHeaderTitle.styles';

const CollectionHeaderTitle = observer(() => {
  const collection = useCollection();
  return (
    <Box sx={styles.title}>
      <Typography
        color="primary"
        variant="h2"
      >
        {collection.name}
      </Typography>

      <When condition={collection.hasSubtitle}>
        <Typography
          sx={styles.subtitle}
          variant="h3"
        >
          {collection.subtitle}
        </Typography>
      </When>
    </Box>
  );
});

export default CollectionHeaderTitle;
