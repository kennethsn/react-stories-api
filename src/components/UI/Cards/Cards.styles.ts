const layoutBase = {
  alignItems: 'center',
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
};

const styles = {
  gridLayoutRoot: {
    ...layoutBase,
    m: 0,
  },
  item: {
    flexShrink: 0,
  },
  stackLayoutRoot: {
    ...layoutBase,
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
