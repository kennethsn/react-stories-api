const styles = {
  caption: {
    color: 'text.secondary',
    whiteSpace: 'pre-wrap',
  },
  captionButton: (hasContent: boolean) => ({
    mb: 2,
    mt: hasContent ? 2 : 0,
  }),
  captionContainer: (hasContent: boolean) => ({
    bgcolor: 'background.lightGrey',
    textAlign: hasContent ? 'left' : 'center',
    px: 4,
    py: 3,
  }),
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
