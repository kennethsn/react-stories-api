import { type ThemeOptions, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useStoriesAPI from './useStoriesAPI';

const useStoriesAPITheme = (themeOptions?: ThemeOptions) => {
  const storiesAPI = useStoriesAPI();
  const theme = useTheme();
  const muiTheme = themeOptions ? storiesAPI.theme.overrideTheme(themeOptions) : theme;
  const breakpointIsMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isMobile = storiesAPI.theme.getIsMobile(breakpointIsMobile);
  return {
    isDesktop: !isMobile,
    isMobile,
    muiTheme,
    theme: storiesAPI.theme,
  };
};

export default useStoriesAPITheme;
