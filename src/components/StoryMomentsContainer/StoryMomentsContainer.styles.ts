import type { Theme } from '@mui/material/styles';

const styles = {
  root: ({ palette: { primary } }: Theme) => ({
    height: '100%',
    width: '100%',

    '.story-moments-container-swiper': {
      '--swiper-navigation-size': '1rem',
      '--swiper-navigation-top-offset': 'calc(100% - 1.5rem)',
      '--swiper-navigation-color': '#e6e6e6',
      '--swiper-navigation-sides-offset': '1.5rem',
      '--swiper-pagination-color': primary.main,
      '--swiper-pagination-bottom': '1.25rem',

      bgcolor: 'background.grey',
      height: '100%',
      width: '100%',

      '.story-moment-swiper-slide': {
        boxSizing: 'border-box',
      },

      '.swiper-button-prev, .swiper-button-next': {
        transition: 'color 0.3s',

        '&:hover': {
          color: primary.main,
        },
      },

      '.swiper-pagination': {
        opacity: 0,

        '&:hover': {
          opacity: 1,
        },
      },

      '&.mobile-layout .swiper-pagination': {
        opacity: 1,
      },
    },
  }),
};

export default styles;
