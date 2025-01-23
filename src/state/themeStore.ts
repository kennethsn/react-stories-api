import type { ThemeOptions } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';

import { buildTheme, deepMerge } from '../utils';
import type RootStore from './rootStore';

export type ThemeStoreOptions = {
  themeOptions?: ThemeOptions;
  isMobile?: boolean;
};

export default class ThemeStore {
  private options: ThemeStoreOptions;

  constructor(public root: RootStore, options: ThemeStoreOptions = {}) {
    makeAutoObservable(this);
    this.root = root;
    this.options = options;
  }

  get muiTheme() {
    return buildTheme(this.themeOptions);
  }

  get themeOptions() {
    return this.options.themeOptions;
  }

  getIsMobile(defaultValue: boolean = false) {
    return this.options.isMobile || defaultValue;
  }

  private overrideThemeOptions(themeOptions: ThemeOptions) {
    return deepMerge(this.themeOptions, themeOptions);
  }

  overrideTheme(themeOptions: ThemeOptions) {
    const options = this.overrideThemeOptions(themeOptions);
    return buildTheme(options);
  }
}
