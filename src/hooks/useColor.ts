import { useTheme } from '@mui/material/styles';

import type { Color } from '../types';

export default function useColor(color?: Color) {
  const { palette } = useTheme();
  if (!color?.background) {
    return {
      background: palette.primary.main,
      text: palette.primary.contrastText,
    };
  }
  return {
    background: color.background,
    text: color.text || palette.getContrastText(color.background),
  };
}
