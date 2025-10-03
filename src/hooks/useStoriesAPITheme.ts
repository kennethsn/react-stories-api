import { type ThemeOptions, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';

import StoriesAPIThemeContext from '../contexts/StoriesAPIThemeContext';
import { deepMerge } from '../utils/object';
import useStoriesAPI from './useStoriesAPI';

const useStoriesAPITheme = (themeOptions?: ThemeOptions) => {
  const parentTheme = useContext(StoriesAPIThemeContext);
  const mergedThemeOptions = themeOptions ? deepMerge(parentTheme, themeOptions) : parentTheme;
  const storiesAPI = useStoriesAPI();
  const theme = useTheme();
  const muiTheme = mergedThemeOptions ? storiesAPI.theme.overrideTheme(mergedThemeOptions) : theme;
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
