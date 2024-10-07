/* eslint-disable react/no-multi-comp */
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/100-italic.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/900-italic.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/virtual';

import CssBaseline from '@mui/material/CssBaseline';
import { type ThemeOptions, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

import StoriesAPIContext, { type IStoriesAPIContext } from '../contexts/StoriesAPIContext';
import type { IStoryContext } from '../contexts/StoryContext';
import type { Story } from '../types';
import { buildTheme } from '../utils/themeUtils';

interface StoriesAPIProviderProps extends PropsWithChildren {
  readonly isDebugging?: boolean;
  readonly theme?: ThemeOptions;
}

function InnerStoriesAPIProvider(
  { props: { children, isDebugging = false } }: { readonly props: StoriesAPIProviderProps },
) {
  const [storyContexts, setStoryContexts] = useState<IStoriesAPIContext['storyContexts']>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const addStoryContext = useCallback((context: IStoryContext) => setStoryContexts({
    ...storyContexts,
    [context.story.id]: context,
  }), [storyContexts]);
  const getStoryContext = useCallback((storyId: Story['id']) => storyContexts[storyId], [storyContexts]);
  const contextValue = useMemo(
    () => ({
      addStoryContext,
      isDebugging,
      isMobile,
      getStoryContext,
      storyContexts,
    }),
    [
      addStoryContext,
      isDebugging,
      isMobile,
      getStoryContext,
      storyContexts,
    ],
  );

  return (
    <StoriesAPIContext.Provider value={contextValue}>
      {children}
    </StoriesAPIContext.Provider>
  );
}

export default function StoriesAPIProvider(
  { theme = undefined, ...props }: StoriesAPIProviderProps,
) {
  const muiTheme = buildTheme(theme);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <InnerStoriesAPIProvider props={props} />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,300,0,0"
        rel="stylesheet"
      />
    </ThemeProvider>
  );
}
