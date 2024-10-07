const styles = {
  root: {
    bgcolor: 'background.paper',
    boxShadow: 1,
    opacity: 0,
    transition: 'opacity 0.2s',

    '&.collapsed': {
      boxShadow: 0,

      '&:hover': {
        boxShadow: 1,
      },
    },

    '&.collapsed, &.expanded:hover': {
      bgcolor: 'background.paper',
      opacity: 1,
    },

    '&:not(.show-on-hover)': {
      opacity: 1,
    },
  },
};

export default styles;
