import type GalleryMomentStore from '../../../state/moments/galleryMomentStore';

const styles = {
  container: (moment: GalleryMomentStore) => ({
    '& .cards-stack-layout-swiper .cards-stack-layout-swiper-slide': {
      alignSelf: 'center',
      backgroundSize: 'cover',
      borderRadius: '8px',
      boxShadow: 3,
      height: 'auto',
      minHeight: '40%',
      minWidth: '40%',
      maxHeight: '100%',
      ...Object.fromEntries(
        moment.items.map(({ position = 'center', url }, i) => [
          `&:nth-of-type(${i + 1})`,
          {
            backgroundImage: `url(${url})`,
            backgroundPosition: position,
          },
        ]),
      ),
    },
  }),
  image: (moment: GalleryMomentStore) => ({
    objectFit: 'contain',
    width: '100%',
    ...(moment.layout === 'stack' ? {
      display: 'flex',
      height: '100%',
      opacity: moment.fit === 'full' ? 1 : 0,
      p: 0,
    } : null),
  }),
};

export default styles;
