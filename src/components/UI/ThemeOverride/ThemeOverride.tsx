import { ThemeProvider } from '@mui/material/styles';

import useStoriesAPI from '../../../hooks/useStoriesAPI';
import type { ThemeOverrideProps } from './ThemeOverride.types';

export default function ThemeOverride({
  children,
  themeOptions,
}: ThemeOverrideProps) {
  const { overrideTheme } = useStoriesAPI();
  const theme = overrideTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
