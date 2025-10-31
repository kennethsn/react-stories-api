const styles = {
  carouselWrapper: {
    mx: 'calc(24px + 5%)',
    px: 5,
    py: 0,

    '& .react-multi-carousel-item > div ': {
      mx: 'auto',
    },

    '& .react-multiple-carousel__arrow': {
      bottom: 0,
      zIndex: 2,
    },

    '& .react-multiple-carousel__arrow--left': {
      '@media (max-width: 950px)': {
        left: 8,
      },
      '@media (max-width: 700px)': {
        left: 4,
      },
    },

    '& .react-multiple-carousel__arrow--right': {
      '@media (max-width: 950px)': {
        right: 8,
      },
      '@media (max-width: 700px)': {
        right: 4,
      },
    },

    '@media (max-width: 950px)': {
      maxWidth: '100%',
      mx: 'auto',
      my: 0,
    },

    '@media (max-width: 700px)': {
      maxWidth: '100%',
      my: 0,
      mx: 'auto',
    },
  },
  graphic: {
    mt: -1,

    '& img': {
      objectFit: 'contain',
      width: '100%',
    },
  },
  root: {
    p: 3,
  },
  title: {
    fontWeight: 300,
    my: 3,
    opacity: 0.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

};

export default styles;
