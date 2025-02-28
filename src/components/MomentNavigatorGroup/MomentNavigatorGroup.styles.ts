const styles = {
  expandIcon: {
    ml: -0.5,
    mr: 1,
    p: 0,
    transition: 'transform 0.2s',

    '&:hover': {
      transform: 'scale(1.2)',
    },

    '.MuiSvgIcon-root': {
      m: 0,
    },
  },
  groupContainer: {
    borderLeft: '1px solid',
    borderLeftColor: 'primary.main',
    ml: 3,
  },
  subheader: {
    alignItems: 'center',
    bgcolor: 'background.paper',
    display: 'flex',
    lineHeight: 1,
    my: 1,
  },
  subheaderLabel: {
    fontSize: '0.6rem',
    lineHeight: 1.8,
    verticalAlign: 'middle',
  },
};

export default styles;
