const styles = {
  zigZagLayoutRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  zigZagSection: {
    position: 'relative',
    minHeight: 200,
    '&:hover': { boxShadow: 'none' },
  },

  zigZagSectionLeft: {
    backgroundColor: 'background.default',
    color: 'text.primary',
  },

  zigZagSectionRight: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },

  angle: {
    backgroundColor: 'inherit',
    height: '25%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transformOrigin: 'top left',
    zIndex: 0,
  },

  angleLeft: {
    transform: 'skewY(-6deg)',
  },

  angleRight: {
    transform: 'skewY(6deg)',
    transformOrigin: 'top right',
  },

  angledSectionBackground: {
    marginTop: '-50px',
    paddingTop: 100,
    paddingBottom: 250,
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },

  zigZagGrid: {
    marginTop: '-25px',
    position: 'relative',
    zIndex: 1,
  },

  zigZagCard: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 400,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  },

  zigZagCaption: {
    container: {
      textAlign: 'center',
      width: '100%',
      marginBottom: '12px',
      '& *': {
        color: 'inherit',
      },
    },
    textBlock: {
      '&:nth-of-type(1)': {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
        marginBottom: '6px',
      },
      '&:nth-of-type(n+2)': {
        fontSize: '0.95rem',
        fontWeight: 400,
        lineHeight: 1.4,
        marginBottom: '8px',
      },
    },
    buttonBlock: {
      backgroundColor: 'primary.main',
      border: '1px solid',
      borderColor: 'primary.main',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '0.85rem',
      fontWeight: 500,
      padding: '6px 16px',
      textAlign: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        backgroundColor: 'primary.dark',
      },
    },
  },
};

export default styles;
