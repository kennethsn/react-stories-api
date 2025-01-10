import type { ThemeOptions } from '@mui/material/styles';

export type ThemeOverrideProps = {
  readonly children: React.ReactNode;
  readonly themeOptions: ThemeOptions;
};
