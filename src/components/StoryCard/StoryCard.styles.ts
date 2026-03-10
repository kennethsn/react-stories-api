const styles = {
  badge: {
    m: 0,
  },
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

    '.StoryCardLabelText': {
      mr: 0.5,
    },
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
  storyId: {
    mt: 0.5,
  },
};

export default styles;
