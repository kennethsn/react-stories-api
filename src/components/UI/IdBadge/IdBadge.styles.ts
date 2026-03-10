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
    transition: 'transform 0.6s ease, box-shadow 0.6s ease',
    width: 240,

    '&:hover': {
      transform: 'translateY(-10px) scale(1.03) rotateX(2deg)',

      '& .badge-dates': {
        opacity: 1,
        transform: 'translateY(0)',
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

    '&:hover .info-panel': {
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translate(0, 0) scale(1)',
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

  badgeInfo: {
    alignItems: 'flex-start',
    backgroundColor: '#1976d2',
    borderBottomLeftRadius: 60,
    cursor: 'pointer',
    display: 'flex',
    height: 56,
    justifyContent: 'flex-end',
    padding: 2,
    position: 'absolute',
    right: 0,
    transition: 'all 0.3s ease',
    top: 0,
    width: 56,
    zIndex: 4,

    '& .info-icon': {
      color: '#fff',
      fontSize: 20,
    },

    '&:hover': {
      height: '33%',
      width: '33%',
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
      height: 'auto',
      width: '100%',
    },
  },

  infoPanel: {
    borderRadius: 8,
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    inset: 0,
    opacity: 0,
    overflowY: 'auto',
    padding: 2,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'scale(0.5)',
    transformOrigin: 'top right',
    transition: 'transform 0.32s cubic-bezier(.2,.9,.2,1), opacity 0.28s ease',
    zIndex: 5,
  },
};

export default styles;
