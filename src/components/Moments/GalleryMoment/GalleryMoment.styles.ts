import type { Theme } from '@mui/material';

import type GalleryMomentStore from '../../../state/moments/galleryMomentStore';
import type { Image } from '../../../types';

const styles = {
  captionContainer: {
    bgcolor: '#fafafadb',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '85%',
    overflowY: 'auto',
    gap: 2,
    m: 1,
    p: 2,
  },
  container: (images: Image[]) => (theme: Theme) => ({
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    height: '100%',
    justifyContent: 'center',

    '& .gallery-swiper': {
      p: 3,
      mx: 2,

      '& .gallery-slide': {
        alignSelf: 'center',
        backgroundSize: 'cover',
        borderRadius: '8px',
        boxShadow: theme.shadows[3],
        height: 'auto',
        minHeight: '40%',
        minWidth: '40%',
        maxHeight: '100%',
        ...Object.fromEntries(
          images.map(({ position = 'center', url }, i) => [
            `&:nth-of-type(${i + 1})`,
            {
              backgroundImage: `url(${url})`,
              backgroundPosition: position,
            },
          ]),
        ),
      },

    },
  }),
  image: (fitIsFullWidth: boolean) => ({
    display: 'flex',
    height: '100%',
    objectFit: 'contain',
    opacity: fitIsFullWidth ? 1 : 0,
    p: 0,
    width: '100%',
  }),
  swiper: (moment: GalleryMomentStore) => ({
    height: '100%',
    width: moment.hasGalleryCaptions ? '50%' : '85%',
  }),
};

export default styles;
