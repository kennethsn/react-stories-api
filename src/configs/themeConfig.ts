import { grey } from '@mui/material/colors';
import type { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {

  interface PletteOptions {
    palette: {
      background: {
        grey: string;
        lightGrey: string;
      };
    }
  }

  interface TypeBackground {
    grey: string;
    lightGrey: string;
  }

  interface TypographyVariants {
    finePrint: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    finePrint?: React.CSSProperties;
  }

}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    finePrint: true;
  }
}

const baseThemeConfig: ThemeOptions = {
  palette: {
    background: {
      grey: grey[100],
      lightGrey: grey[50],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
  },
  typography: {
    finePrint: {
      color: grey[600],
      fontSize: 10,
      fontStyle: 'italic',
      fontWeight: 400,
    },
    overline: {
      lineHeight: 1,
    },
  },
};

export default baseThemeConfig;
