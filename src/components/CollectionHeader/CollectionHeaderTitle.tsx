import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useCollection from '../../hooks/useCollection';
import CollectionTypography from '../CollectionTypography/CollectionTypography';
import styles from './CollectionHeaderTitle.styles';

const CollectionHeaderTitle = observer(() => {
  const collection = useCollection();
  return (
    <Box sx={styles.title}>
      <CollectionTypography
        color="primary"
        field="name"
        variant="h2"
      />

      <When condition={collection.hasSubtitle}>
        <CollectionTypography
          field="subtitle"
          sx={styles.subtitle}
          variant="h3"
        />
      </When>
    </Box>
  );
});

export default CollectionHeaderTitle;
