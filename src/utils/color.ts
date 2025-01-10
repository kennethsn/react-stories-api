import type { Theme } from '@mui/material/styles';

import { COLOR_HEX_REGEX, THEME_COLOR_OPTIONS } from '../constants';
import type {
  Color,
  ColorHex,
  ColorString,
  Nullable,
  ThemeColorOption,
} from '../types';

const themeColorSet = new Set(THEME_COLOR_OPTIONS);

export const getColorHex = (
  color: ColorString,
  theme: Theme,
  defaultColor?: ColorHex,
): ColorHex => {
  if (isThemeColorOption(color)) {
    return theme.palette[color].main as ColorHex;
  }
  if (isColorHex(color)) {
    return color;
  }
  if (defaultColor) {
    return defaultColor;
  }
  throw new Error(`Invalid color: ${color}`);
};

export const isColorHex = (color: ColorString): color is ColorHex => COLOR_HEX_REGEX.test(color);

export const isThemeColorOption = (color: ColorString): color is ThemeColorOption => (
  themeColorSet.has(color as ThemeColorOption)
);

export const processColor = (color: Nullable<Color>, theme: Theme): {
  background: ColorHex;
  text: ColorHex;
} => {
  const { palette } = theme;
  const primaryColor = palette.primary.main as ColorHex;
  const primaryColorContrast = palette.primary.contrastText as ColorHex;
  if (!color?.background) {
    return {
      background: primaryColor,
      text: primaryColorContrast,
    };
  }
  const background = getColorHex(color.background, theme, primaryColor);
  const text = color.text ? (
    getColorHex(color.text, theme, primaryColorContrast)
  ) : (
    palette.getContrastText(background) as ColorHex
  );
  return {
    background,
    text,
  };
};
