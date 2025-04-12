import type { ThemeOptions } from '@mui/material/styles';
import { createContext } from 'react';

export type IStoriesAPIThemeContext = ThemeOptions | undefined;

const StoriesAPIThemeContext = createContext<IStoriesAPIThemeContext>(undefined);

export default StoriesAPIThemeContext;
