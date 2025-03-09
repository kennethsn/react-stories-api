import { useTheme } from '@mui/material/styles';

import type { Color } from '../types';
import { processColor } from '../utils/color';
import { buildThemeColorOverrideOptions } from '../utils/themeUtils';

export default function useColor(color?: Color) {
  const theme = useTheme();
  const { background, text } = processColor(color, theme);
  const themeOptions = buildThemeColorOverrideOptions(background, text);
  return {
    background,
    text,
    themeOptions,
  };
}
