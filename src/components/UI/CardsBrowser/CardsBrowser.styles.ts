const styles = {
  cardsContainer: (isLoading: boolean) => ({
    mb: 3,
    opacity: isLoading ? 0.5 : 1,
    px: { xs: 1, md: 4 },
    transition: 'opacity 0.2s',
  }),
  landingSuggestionChip: (
    isSelected: boolean,
    isFaded: boolean,
    isTransitioning: boolean,
  ) => ({
    animation: isTransitioning
      ? 'none'
      : 'landingSuggestionsFadeUp 480ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both',
    backdropFilter: 'blur(10px)',
    bgcolor: 'background.paper',
    borderColor: 'primary.main',
    borderRadius: 999,
    boxShadow: 4,
    color: 'primary.main',
    fontSize: 13,
    fontWeight: 600,
    opacity: isFaded ? 0 : 1,
    px: 0.6,
    py: 0.35,
    transform: isSelected ? 'translateY(-2px) scale(1.01)' : 'none',
    transition: 'all 0.42s ease',
    ...(isSelected ? {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
    } : undefined),

    '&& .MuiChip-icon': {
      color: isSelected ? 'primary.contrastText' : 'primary.main',
    },

    '&&:hover': {
      bgcolor: 'primary.main',
      borderColor: 'primary.main',
      boxShadow: 8,
      color: 'primary.contrastText',
      transform: 'translateY(-2px) scale(1.01)',

      '&& .MuiChip-icon': {
        color: 'primary.contrastText',
      },
    },
  }),
  landingSuggestionsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    justifyContent: 'center',
    mt: 1.5,
    width: '100%',
  },
  landingSuggestionsRoot: (isTransitioning: boolean) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 760,
    mt: 2,
    opacity: isTransitioning ? 0 : 0.82,
    px: 2,
    py: 2,
    transition: 'opacity 0.52s ease',
    width: '100%',

    '&:hover': {
      opacity: isTransitioning ? 0 : 1,
    },
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
  searchInlineLoader: (isLoading: boolean) => ({
    borderRadius: 999,
    mt: 1,
    opacity: isLoading ? 1 : 0,
    transition: 'opacity 0.2s ease',
    visibility: isLoading ? 'visible' : 'hidden',
    width: '100%',
  }),
  searchInputOverlayAnchor: {
    position: 'relative',
    width: '100%',
  },
  searchSuggestionOption: (
    index: number,
    isActive: boolean,
    isSelected: boolean,
    isFaded: boolean,
    isTransitioning: boolean,
  ) => ({
    animation: isTransitioning
      ? 'none'
      : `cardsBrowserSuggestionFadeIn 220ms ease ${index * 40}ms both`,
    alignItems: 'center',
    borderRadius: 1.5,
    color: 'text.primary',
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: 38,
    opacity: isFaded ? 0 : 1,
    px: 1.25,
    py: 0.75,
    transition: 'all 0.42s ease',
    width: '100%',
    ...(isActive ? {
      bgcolor: 'action.hover',
      color: 'primary.main',
      transform: 'translateX(1px)',
    } : undefined),
    ...(isSelected ? {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      transform: 'translateX(1px)',
    } : undefined),

    '&:hover': {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      transform: 'translateX(1px)',
    },

    '&:focus-visible': {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: 1,
    },

    '@keyframes cardsBrowserSuggestionFadeIn': {
      from: {
        opacity: 0,
        transform: 'translateY(6px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    '@keyframes landingSuggestionsFadeUp': {
      from: {
        opacity: 0,
        transform: 'translateY(12px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  }),
  searchSuggestionTitle: {
    color: 'inherit',
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'left',
  },
  searchSuggestionTitleWrap: {
    alignItems: 'center',
    display: 'flex',
    gap: 1,
    width: '100%',
  },
  searchSuggestionsOverlayPaper: (isTransitioning: boolean) => ({
    backdropFilter: 'blur(8px)',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    boxShadow: 8,
    left: 0,
    mt: 0.75,
    opacity: isTransitioning ? 0 : 1,
    position: 'absolute',
    right: 0,
    top: '100%',
    transition: 'opacity 0.52s ease',
    zIndex: 20,
  }),
  searchSuggestionsPaper: {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    px: 1,
    py: 1,
    width: '100%',
  },
  searchSuggestionsStack: {
    gap: 1,
    width: '100%',
  },
  searchRoot: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    maxHeight: '85vh',
    opacity: 0.8,
    overflowY: 'auto',
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
