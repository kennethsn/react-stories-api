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
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/virtual';

import CssBaseline from '@mui/material/CssBaseline';
import { type ThemeOptions, ThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

import RootStore, { type RootStoreOptions } from '../state/rootStore';
import StoriesAPIThemeProvider from './StoriesAPIThemeProvider';

type StoriesAPIProviderProps = PropsWithChildren & Omit<RootStoreOptions, 'themeOptions'> & {
  readonly theme?: ThemeOptions;
};

RootStore.initContext();

export default function StoriesAPIProvider({
  children,
  theme = undefined,
  ...props
}: StoriesAPIProviderProps) {
  const { Provider: RootStoreProvider } = RootStore.contextInstance;
  const store = new RootStore({
    themeOptions: theme,
    ...props,
  });
  return (
    <RootStoreProvider value={store}>
      <StoriesAPIThemeProvider theme={theme}>
        <ThemeProvider theme={store.theme.muiTheme}>
          <CssBaseline />

          {children}

          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,300,0,0"
            rel="stylesheet"
          />
        </ThemeProvider>
      </StoriesAPIThemeProvider>
    </RootStoreProvider>
  );
}
