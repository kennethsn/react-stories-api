import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';
import { Link } from 'react-router-dom';

import { useStoriesAPINavigation } from '../../hooks';
import ContainerBadge from '../UI/ContainerBadge/ContainerBadge';
import styles from './CollectionsListItem.styles';
import type { CollectionsListItemProps } from './CollectionsListItem.types';

const CollectionsListItem = observer(({
  collection,
  collectionPathFormatter,
  enabled,
}: CollectionsListItemProps) => {
  const { getPath } = useStoriesAPINavigation();
  const isDisabled = enabled ? false : !collection.isPublished;
  const to = isDisabled ? undefined : (
    getPath({ collection_id: collection.id, formatter: collectionPathFormatter })
  );
  return (
    <Grid
      component={isDisabled ? 'div' : Link}
      container
      spacing={0}
      sx={styles.root(isDisabled)}
      to={to}
    >
      <When condition={collection.hasBadge}>
        <ContainerBadge
          color={collection.isFeatured ? 'primary' : 'secondary'}
          direction="left"
          sx={styles.badge}
        >
          {collection.badge}
        </ContainerBadge>
      </When>

      <Grid
        size={{ md: 8, xs: 4 }}
        sx={styles.imageContainer}
      >
        <When condition={collection.hasImage}>
          <Box
            className="CollectionsListItemImage"
            sx={styles.image(collection.image!)}
          />
        </When>
      </Grid>

      <Grid
        size={{ md: 4, xs: 8 }}
        sx={styles.titleContainer}
      >
        <Typography
          color="primary"
          sx={styles.name}
          variant="h4"
        >
          {collection.name}
        </Typography>

        <When condition={collection.hasSubtitle}>
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {collection.subtitle}
          </Typography>
        </When>
      </Grid>
    </Grid>
  );
});

export default CollectionsListItem;
