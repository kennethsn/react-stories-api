const styles = {
  orbitLayoutRoot: {
    height: '600px',
    padding: '0 64px',
    perspective: '1200px',
    position: 'relative',
    width: '100%',
  },

  orbitInner: (rotation: number) => ({
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
    transformOrigin: 'center center',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s ease-in-out',
    width: 0,
    height: 0,
  }),

  orbitItem: (
    angle: number,
    radius: number,
  ) => ({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: `
      translate(-50%, -50%)
      rotateY(${angle}deg)
      translateZ(${radius}px)
      scale(1)
    `,
    transformOrigin: 'center center',
    transition: 'transform 0.8s ease-in-out',
  }),

  navLeft: {
    left: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 3,
  },

  navRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 3,
  },
};

export default styles;
