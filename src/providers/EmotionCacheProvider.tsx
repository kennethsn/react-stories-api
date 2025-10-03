import { CacheProvider } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';

import useStoriesAPITheme from '../hooks/useStoriesAPITheme';

type EmotionCacheProviderProps = PropsWithChildren;

const EmotionCacheProvider = observer(({ children }: EmotionCacheProviderProps) => {
  const { theme } = useStoriesAPITheme();
  return (
    <CacheProvider value={theme.emotionCache}>
      {children}
    </CacheProvider>
  );
});

export default EmotionCacheProvider;
