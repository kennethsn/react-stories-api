import { ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import useStoriesAPITheme from '../../../hooks/useStoriesAPITheme';
import StoriesAPIThemeProvider from '../../../providers/StoriesAPIThemeProvider';
import type { ThemeOverrideProps } from './ThemeOverride.types';

const ThemeOverride = observer(({
  children,
  themeOptions,
}: ThemeOverrideProps) => {
  const storiesAPITheme = useStoriesAPITheme(themeOptions);
  return (
    <StoriesAPIThemeProvider theme={themeOptions}>
      <ThemeProvider theme={storiesAPITheme.muiTheme}>
        {children}
      </ThemeProvider>
    </StoriesAPIThemeProvider>
  );
});

export default ThemeOverride;
