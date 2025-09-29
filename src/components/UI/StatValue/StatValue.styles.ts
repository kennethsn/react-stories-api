const styles = {
  list: {
    maxHeight: '50vh',
    overflowY: 'auto',
    paddingBottom: 8,
    paddingTop: 4,
  },
  listAvatar: {
    alignItems: 'center',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    fontSize: '1rem',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  listAvatarContainer: {
    minWidth: 40,
    position: 'relative',
    '&::after': {
      borderRight: '0.125rem solid #edeff0',
      content: '""',
      height: '100%',
      left: 11,
      opacity: 1,
      position: 'absolute',
      top: '2rem',
    },
    '&.last-item::after': {
      content: 'none',
      height: 0,
    },
  },
  listItem: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 2,
    padding: 0,
    paddingBottom: 4,
  },
  listItemDescription: {
    color: '#555',
    fontSize: '0.75rem',
  },
  listItemLabel: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  number: {
    display: 'inline',
    fontSize: '3rem',
    fontWeight: 400,
  },
  numberContainer: {
    textAlign: 'center',
  },
  string: {
    paddingBottom: 16,
    textAlign: 'center',
  },
  stringLarge: {
    fontSize: '3rem',
    fontWeight: 400,
    textAlign: 'center',
  },
  stringSmall: {
    fontSize: '1rem',
    textAlign: 'center',
  },
  unit: {
    display: 'inline',
    fontSize: '1rem',
  },
};

export default styles;
