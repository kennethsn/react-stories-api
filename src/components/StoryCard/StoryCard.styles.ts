const styles = {
  description: {
    fontSize: '0.8rem',
  },
  image: {
    aspectRatio: '7 / 5',
    background: 'linear-gradient(to top, #002b5b, #00366c)',
    objectFit: 'cover',
    objectPosition: '50% 45%',
    opacity: 0.75,
    height: '100%',
    transition: 'all 1s',
    width: '100%',
  },
  label: {
    fontSize: { xs: '1.05rem', md: '1.15rem' },
  },
  root: {
    whiteSpace: 'pre-wrap',

    ':hover': {
      opacity: 1,

      img: {
        objectPosition: '50% 40%',
        opacity: 1,
      },
    },
  },
};

export default styles;
