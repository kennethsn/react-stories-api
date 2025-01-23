import { ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import useStoriesAPITheme from '../../../hooks/useStoriesAPITheme';
import type { ThemeOverrideProps } from './ThemeOverride.types';

const ThemeOverride = observer(({
  children,
  themeOptions,
}: ThemeOverrideProps) => {
  const storiesAPITheme = useStoriesAPITheme(themeOptions);
  return (
    <ThemeProvider theme={storiesAPITheme.muiTheme}>
      {children}
    </ThemeProvider>
  );
});

export default ThemeOverride;
