import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import StoriesAPIThemeContext,
{ type IStoriesAPIThemeContext } from '../contexts/StoriesAPIThemeContext';
import EmotionCacheProvider from './EmotionCacheProvider';

type StoriesAPIThemeProviderProps = PropsWithChildren & {
  readonly theme?: IStoriesAPIThemeContext;
};

const StoriesAPIThemeProvider = observer(({ children, theme }: StoriesAPIThemeProviderProps) => (
  <EmotionCacheProvider>
    <StoriesAPIThemeContext.Provider value={theme}>
      {children}
    </StoriesAPIThemeContext.Provider>
  </EmotionCacheProvider>
));

export default StoriesAPIThemeProvider;
