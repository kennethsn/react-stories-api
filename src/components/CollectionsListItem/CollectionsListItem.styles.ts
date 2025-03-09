import { darken, type Theme } from '@mui/material';

const styles = {
  badge: {
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 2,
    borderRadius: 0,
  },
  image: (image: string) => ({
    background: `url(${image})`,
    backgroundPosition: '50% 40%',
    backgroundSize: 'cover',
    height: '100%',
    opacity: 0.6,
    transition: 'all 1s',
    width: '100%',
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  }),
  imageContainer: ({ palette }: Theme) => ({
    background: (
      `linear-gradient(to top, ${darken(palette.primary.main, 0.3)}, ${palette.primary.main})`
    ),
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    height: 'auto',
  }),
  name: (theme: Theme) => ({
    fontFamily: theme.typography.h2.fontFamily,
  }),
  root: (isDisabled: boolean) => ({ shadows }: Theme) => ({
    bgcolor: 'background.grey',
    borderColor: 'text.secondary',
    borderStyle: 'solid',
    borderRadius: 1,
    minHeight: 175,
    opacity: isDisabled ? 0.5 : 0.8,
    textDecoration: 'none',
    transition: 'all 0.5s',

    ':hover': isDisabled ? null : {
      boxShadow: shadows[5],
      borderColor: 'transparent',
      opacity: 1,

      '.CollectionsListItemImage': {
        backgroundPosition: '50% 45%',
        opacity: 1,
      },
    },
  }),
  titleContainer: {
    alignItems: 'space-around',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
    px: 2,
    py: 3,
  },
};

export default styles;
