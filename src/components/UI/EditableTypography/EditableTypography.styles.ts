import type { CSSObject, SxProps, Theme } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

const styles = {
  textField: (
    rootSx: SxProps<Theme> | undefined,
    textFieldSx: SxProps<Theme> | undefined,
    color: string,
    typographyVariant: TypographyProps['variant'],
  ) => ({ typography }: Theme): SxProps<Theme> => ({
    ...(typographyVariant && typographyVariant !== 'inherit' ? typography[typographyVariant] : {}),
    ...textFieldSx,
    '& .MuiInputBase-root': {
      ...rootSx as CSSObject,
      color,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      '& .MuiInputBase-input': {
        p: 0,
      },
    },
  }),
  typography: {
    whiteSpace: 'pre-wrap',
  },
};

export default styles;
