const styles = {
  container: {
    cursor: 'pointer',
    margin: 25,
    perspective: 800,
  },

  badge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    boxShadow:
      'rgba(0,0,0,0.6) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255,255,255,0.2) 0 0 0 6px',
    color: '#fff',
    height: 320,
    margin: '0 auto',
    overflow: 'hidden',
    position: 'relative',
    width: 240,
    transition: 'transform 0.6s ease, box-shadow 0.6s ease',
    '&:hover': {
      transform: 'translateY(-10px) scale(1.03) rotateX(2deg)',
      '& .badge-dates': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },

    '& .badge-inner': {
      borderRadius: 8,
      height: '100%',
      position: 'relative',
      width: '100%',
    },

    '& .badge-inner__bg': {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
      left: 0,
      opacity: 0.5,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: '100%',
    },

    '& .badge-body': {
      bottom: 15,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      zIndex: 2,
    },

    '& .badge-logo img': {
      background: 'transparent',
      borderRadius: 0,
      display: 'block',
      margin: '0 auto 5px',
      maxHeight: 80,
      maxWidth: '90%',
    },

    '& .badge-dates': {
      color: '#fff',
      fontSize: '0.70rem',
      opacity: 0,
      padding: '0 4px',
      textAlign: 'center',
      transform: 'translateY(100%)',
      transition: 'transform 0.5s ease, opacity 0.5s ease',
      width: '100%',
    },
  },

  topGraphic: {
    left: '50%',
    position: 'absolute',
    top: -50,
    transform: 'translateX(-50%)',
    zIndex: 1,
    '& img': {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
};

export default styles;
