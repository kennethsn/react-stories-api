const styles = {
  author: {
    fontSize: '75%',
    fontWeight: 400,
  },
  content: (coverColor?: string, textColor?: string) => ({
    bgcolor: coverColor || 'transparent',
    color: textColor || 'typography.primary',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 300,
    height: '100%',
    justifyContent: 'center',
    p: 1,
  }),
  cover: (accentColor?: string) => ({
    bgcolor: accentColor || 'background.paper',
    display: 'table',
    height: '100%',
    hyphens: 'auto',
    transformOrigin: '0 50%',
    transform: 'rotateY(0)',
    transition: 'all 0.45s ease',
    width: '100%',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  }),
  root: {
    background: '#fff',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    boxShadow:
    '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 9px 20px 0 rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    display: 'block',
    height: 220,
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    transition: 'box-shadow 0.3s linear',
    width: 150,
    zIndex: 1,

    '&::before, &::after': {
      background: '#fff',
      border: '1px solid #ccc',
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      content: "''",
      display: 'block',
      height: '100%',
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1,
    },

    '&::before': {
      left: -3,
    },
    '&::after': {
      left: -6,
    },

    '&:hover': {
      boxShadow:
        '0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 9px 20px 0 rgba(0, 0, 0, 0.45)',

      '& .BookCover': {
        transform: 'rotateY(-25deg)',
        boxShadow: '1px 1px 5px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  title: {
    borderBottom: '1px solid',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '85%',
    fontWeight: 'bold',
    mt: 4,
  },
};

export default styles;
