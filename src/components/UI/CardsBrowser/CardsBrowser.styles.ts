const styles = {
  cardsContainer: (isLoading: boolean) => ({
    mb: 3,
    opacity: isLoading ? 0.5 : 1,
    px: { xs: 1, md: 4 },
    transition: 'opacity 0.2s',
  }),
  loader: (isLoading: boolean) => ({
    mx: { xs: 1, md: 6 },
    visibility: isLoading ? 'visible' : 'hidden',
  }),
  noResults: {
    bgcolor: 'background.grey',
    m: { xs: 1, md: 6 },
    maxWidth: 600,
    p: 4,
    textAlign: 'center',
    width: '100%',
  },
  paginationContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    opacity: 0.5,
    transition: 'opacity 0.2s',

    '&:hover': {
      opacity: 1,
    },
  },
  searchRoot: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  searchSectionContainer: {
    px: { md: 10, xs: 1 },
    py: 2,
  },
  toolFacetsPanelRoot: {
    bgcolor: 'background.lightGrey',
    borderRadius: 2,
    boxShadow: 1,
    m: 1,
    maxHeight: '100%',
    opacity: 0.8,
    overflowY: 'scroll',
    p: 2,
    transition: 'box-shadow 0.4s, opacity 0.4s',
    width: 'auto',

    ':hover': {
      boxShadow: 3,
      opacity: 1,
    },
  },
};

export default styles;
