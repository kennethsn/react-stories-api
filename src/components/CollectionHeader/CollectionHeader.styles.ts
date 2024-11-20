const styles = {
  container: (image?: string) => ({
    alignItems: 'center',
    background: image && (
      `linear-gradient(160deg, #b6b6b6e6, #f5f5f5 75%), url(${image}) no-repeat center center`
    ),
    backgroundSize: 'cover',
    px: 5,
    py: 10,
  }),
  content: {
    alignContent: 'center',
    my: 4,
  },
  titleColContainer: {
    alignContent: 'center',
  },
};

export default styles;
