import type { Theme } from '@mui/material';

import type GalleryMomentStore from '../../../state/moments/galleryMomentStore';

const styles = {
  caption: {
    p: 2,
  },
  container: (theme: Theme) => ({
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    height: '100%',

    '& .gallery-swiper': {
      p: 3,

      '& .gallery-slide': {
        alignSelf: 'center',
        borderRadius: '8px',
        boxShadow: theme.shadows[3],
        height: 'auto',
        minHeight: '40%',
        minWidth: '40%',
        maxHeight: '100%',
      },
    },
  }),
  image: {
    display: 'flex',
    height: '100%',
    objectFit: 'contain',
    p: 0,
    width: '100%',
  },
  swiper: (moment: GalleryMomentStore) => ({
    height: '100%',
    width: moment.hasGalleryCaptions ? '50%' : '85%',
  }),
};

export default styles;
