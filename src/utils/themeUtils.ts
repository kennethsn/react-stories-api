import { createTheme, responsiveFontSizes, type ThemeOptions } from '@mui/material/styles';

import themeConfig from '../configs/themeConfig';
import type { ColorHex } from '../types';
import { deepMerge } from './object';

export const buildTheme = (themeOptions?: ThemeOptions) => {
  const mergedThemeOptions = deepMerge(themeConfig, themeOptions ?? {});
  const initialTheme = createTheme(mergedThemeOptions);
  const responsiveTheme = responsiveFontSizes(initialTheme);
  return responsiveTheme;
};

export const buildThemeColorOverrideOptions = (background: ColorHex, text: ColorHex) => ({
  palette: {
    primary: {
      main: background,
      contrastText: text,
    },
  },
});
