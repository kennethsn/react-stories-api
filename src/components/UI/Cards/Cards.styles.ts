const styles = {
  gridLayoutRoot: {
    m: 0,
  },
  item: {
    flexShrink: 0,
  },
  orbitLayoutRoot: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    overflow: 'visible',
    perspective: 1200,
    position: 'relative',
    width: '100%',

    '& .cards-orbit-wrapper': {
      height: '100%',
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: 'transform 1s ease-in-out',
      width: '100%',
    },

    '& .cards-orbit-slide': {
      left: '50%',
      position: 'absolute',
      top: '50%',
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease, opacity 0.6s ease',
    },
  },
  stackLayoutRoot: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    height: '100%',
    justifyContent: 'center',
    width: '100%',

    '& .cards-stack-layout-swiper': {
      p: 3,
      mx: 2,
      height: '80%',
      width: '70%',

      '& .cards-stack-layout-swiper-slide  .swiper-slide-shadow': {
        display: 'none',
      },
    },
  },
};

export default styles;
