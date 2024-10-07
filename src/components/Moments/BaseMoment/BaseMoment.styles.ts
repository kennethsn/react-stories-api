const styles = {
  contentContainer: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
  },
  headerCollapseButton: {
    marginTop: '-1.5rem',
    position: 'absolute',
    right: '1.5rem',
    zIndex: 1,

    '&.collapsed': {
      marginTop: '-0.5rem',
    },
  },
  headerContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  root: {
    bgcolor: 'background.paper',
    color: 'text.primary',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    width: '100%',
  },
};

export default styles;
