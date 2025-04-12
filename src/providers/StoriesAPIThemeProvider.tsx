import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import StoriesAPIThemeContext,
{ type IStoriesAPIThemeContext } from '../contexts/StoriesAPIThemeContext';

type StoriesAPIThemeProviderProps = PropsWithChildren & {
  readonly theme?: IStoriesAPIThemeContext;
};

const StoriesAPIThemeProvider = observer(({ children, theme }: StoriesAPIThemeProviderProps) => (
  <StoriesAPIThemeContext.Provider value={theme}>
    {children}
  </StoriesAPIThemeContext.Provider>
));

export default StoriesAPIThemeProvider;
