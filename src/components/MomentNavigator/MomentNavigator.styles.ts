const styles = {
  brandingContainer: {

    img: {
      width: '100%',
    },
  },
  divider: {
    my: 0.5,
    mx: -1,
  },
  footerContainer: {
    m: 1,
    textAlign: 'center',
    width: '100%',
  },
  imageContainer: {

    button: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      display: 'flex',
      maxWidth: '16rem',
      mx: 'auto',
      p: 0,
    },

    img: {
      filter: 'grayscale(80%)',
      opacity: 0.6,
      textAlign: 'center',
      transition: 'all 1.6s',
      width: '100%',
      '&:hover': {
        filter: 'grayscale(10%)',
        opacity: 1,
      },
    },
  },
  labelContainer: {
    p: 2,
  },
  listContainer: {
    width: '100%',

    '& ul': { p: 0 },
  },
  groupContainer: {
    borderLeft: '1px solid',
    borderLeftColor: 'primary.main',
    ml: 3,
  },
  root: {
    boxShadow: 10,
    bgcolor: 'background.paper',
    height: '100%',
    overflow: 'auto',
  },
  storiesServicesLink: {
    a: {
      color: 'grey.400',
      textDecoration: 'none',
      transition: 'all 0.4s',

      '&:hover': {
        color: 'primary.main',
        textDecoration: 'underline',
      },
    },
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
