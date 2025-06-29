import { styled } from '@mui/material/styles';

const styles = {
  container: styled('div')({
    // If any container-level styles are needed
  }),

  title: styled('h2')({
    fontSize: '250%',
    fontWeight: 300,
    marginBottom: 20,
    opacity: 0.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  }),

  carouselWrapper: styled('div')({
    margin: '0 calc(24px + 5%)',
    padding: '0 40px',

    '& .react-multi-carousel-item > div ': {
      marginLeft: 'auto',
      marginRight: 'auto',

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
      margin: '0 auto',
      maxWidth: '100%',
    },

    '@media (max-width: 700px)': {
      margin: '0 auto',
      maxWidth: '100%',
    },
  }),

  graphic: styled('div')({
    marginTop: -5,

    '& img': {
      width: '100%',
    },
  }),
};

export default styles;
