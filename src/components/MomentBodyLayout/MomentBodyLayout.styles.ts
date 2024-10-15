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
  content: (borderRadius: number, boxShadow: number) => ({
    alignContent: 'center',
    height: '100%',
    mx: 'auto',
    width: '100%',

    '& > *': {
      borderRadius,
      boxShadow,
    },
  }),
  contentContainer: {
    alignSelf: 'center',
  },
  root: {
    justifyContent: 'center',
    overflowY: 'auto',
    width: '100%',
  },
};

export default styles;
