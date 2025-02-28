const styles = {
  input: {
    opacity: 0.5,
    transition: 'opacity 0.2s',

    '&:hover': {
      opacity: 1,
    },
  },
  noResults: {
    bgcolor: 'background.grey',
    m: { xs: 1, md: 6 },
    maxWidth: 600,
    p: 4,
    textAlign: 'center',
    width: '100%',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default styles;
