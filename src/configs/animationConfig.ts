const animationConfig = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeDown: {
    from: { opacity: 0, transform: 'translateY(-2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  fadeDownLeft: {
    from: { opacity: 0, transform: 'translateX(2rem) translateY(-2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  fadeDownRight: {
    from: { opacity: 0, transform: 'translateX(-2rem) translateY(-2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  fadeUpLeft: {
    from: { opacity: 0, transform: 'translateX(2rem) translateY(2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  fadeUpRight: {
    from: { opacity: 0, transform: 'translateX(-2rem) translateY(2rem)' },
    to: { opacity: 1, transform: 'none' },
  },
  scale: {
    from: { transform: 'scale(0)' },
    to: { transform: 'none' },
  },
};

export default animationConfig;
