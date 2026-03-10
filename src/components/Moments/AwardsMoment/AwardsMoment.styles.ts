const styles = {
  container: {
    backgroundImage: 'url(https://stories-api-public.s3.amazonaws.com/award-moment-background.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: 600,

    '@media (max-width: 768px)': {
      minHeight: 420,
      paddingBottom: 16,
      paddingTop: 16,
    },

    '@media (max-width: 320px)': {
      paddingBottom: 4,
      paddingTop: 4,
    },
  },
  divider: {
    background: 'rgba(255, 255, 255, 0.45)',
  },
  margin: {
    height: 24,
  },
  sideBarAward: {
    padding: 64,
  },
  sideBarBody: {
    background: '#fff',
  },
  sideBarFooter: {
    color: '#fff',
    padding: 32,
  },
  sideBarHeader: {
    fontWeight: 300,
    padding: 24,
  },
  sideBarImage: {
    maxHeight: '50vh',
    maxWidth: '100%',
  },
  sideBarRoot: {
    backgroundColor: '#616161', // grey[700]
    textAlign: 'center',
    minWidth: '40%',
  },
  root: {
    width: 300,
  },
};

export default styles;
