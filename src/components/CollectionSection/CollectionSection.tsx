import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { Unless, When } from 'react-if';

import { StoriesAPIButton } from '../StoriesAPIButton';
import ContainerBadge from '../UI/ContainerBadge/ContainerBadge';
import styles from './CollectionSection.styles';
import type { CollectionSectionProps } from './CollectionSection.types';

const CollectionSection = observer(({ collection, enabled }: CollectionSectionProps) => {
  const isDisabled = enabled ? false : !collection.isPublished;
  return (
    <Grid
      container
      spacing={4}
      sx={styles.root}
    >
      <When condition={collection.hasBadge}>
        <ContainerBadge
          color={collection.isFeatured ? 'primary' : 'secondary'}
          offset={5}
        >
          {collection.badge}
        </ContainerBadge>
      </When>

      <When condition={collection.hasImage}>
        <Grid
          size={{ md: 4, xs: 12 }}
          sx={styles.imageContainer}
        >
          <img
            alt={collection.name}
            loading="lazy"
            src={collection.image!}
          />
        </Grid>
      </When>

      <Grid
        size={{ md: collection.hasImage ? 8 : 12, xs: 12 }}
        sx={styles.contentContainer}
      >
        <Typography
          color="white"
          variant="h2"
        >
          {collection.name}
        </Typography>

        <When condition={collection.hasSubtitle}>
          <Typography
            sx={styles.subtitle}
            variant="h4"
          >
            {collection.subtitle}
          </Typography>
        </When>

        <When condition={collection.hasDescription}>
          <Typography
            sx={styles.description}
            variant="body1"
          >
            {collection.description}
          </Typography>
        </When>

        <Unless condition={isDisabled}>
          <StoriesAPIButton
            button={{
              collectionId: collection.id,
              label: 'View Collection',
            }}
            color="secondary"
            disableElevation
          />
        </Unless>
      </Grid>
    </Grid>
  );
});

export default CollectionSection;
