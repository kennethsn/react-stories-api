const styles = {
  caption: {
    color: 'text.secondary',
    whiteSpace: 'pre-wrap',
  },
  captionContainer: {
    bgcolor: 'background.lightGrey',
    px: 4,
    py: 3,
  },
  captionGridItem: {
    alignContent: 'center',
    overflow: 'auto',
  },
  image: (imageFitIsCard: boolean, imageFitIsCover: boolean) => ({
    alignContent: 'center',
    height: '100%',
    mx: 'auto',
    width: '100%',

    '.moment-image': {
      borderRadius: imageFitIsCard ? 2 : undefined,
      boxShadow: imageFitIsCard ? 4 : undefined,
      display: 'block',
      height: imageFitIsCover ? '100%' : 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      mx: 'auto',
      objectFit: imageFitIsCover ? 'cover' : 'contain',
      width: imageFitIsCard ? 'initial' : '100%',
    },
  }),
  imageContainer: {
    alignSelf: 'center',
  },
  root: {
    justifyContent: 'center',
    overflowY: 'auto',
    width: '100%',
  },
};

export default styles;
