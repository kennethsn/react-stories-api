import type { Theme } from '@mui/material/styles';

const styles = {
  badge: {
    fontSize: 'inherit',
  },
  contentContainer: {
    alignContent: 'center',
  },
  description: {
    my: 3,
    whiteSpace: 'pre-wrap',
  },
  imageContainer: {

    img: {
      borderRadius: 0.5,
      height: '100%',
      objectFit: 'cover',
      width: '100%',
    },
  },
  name: ({ palette }: Theme) => ({
    color: palette.primary.contrastText,
  }),
  subtitle: ({ palette }: Theme) => ({
    color: palette.secondary.light,
    fontStyle: 'italic',
    mb: 2,
  }),
  root: ({ palette }: Theme) => ({
    backgroundColor: palette.primary.light,
    borderColor: palette.primary.main,
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    color: 'white',
    mx: 'auto',
    my: 3,
    p: 3,
    maxWidth: { xl: 1500, xs: 1000 },
  }),

};

export default styles;
