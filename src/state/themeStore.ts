import createCache from '@emotion/cache';
import type { ThemeOptions } from '@mui/material/styles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { makeAutoObservable } from 'mobx';
import { prefixer } from 'stylis';

import { deepMerge } from '../utils/object';
import { buildTheme } from '../utils/themeUtils';
import type RootStore from './rootStore';

export type ThemeStoreOptions = {
  themeOptions?: ThemeOptions;
  isMobile?: boolean;
};

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: 'mui',
});

export default class ThemeStore {
  options: ThemeStoreOptions;

  constructor(public root: RootStore, options: ThemeStoreOptions = {}) {
    makeAutoObservable(this);
    this.root = root;
    this.options = options;
  }

  get emotionCache() {
    return this.isRTL ? rtlCache : ltrCache;
  }

  get isRTL() {
    return this.muiTheme.direction === 'rtl' || this.root.locale.isRTL;
  }

  get muiTheme() {
    return buildTheme(this.themeOptions);
  }

  get themeOptions() {
    return deepMerge(this.options.themeOptions, this.root.locale.themeOptions);
  }

  getIsMobile(defaultValue: boolean = false) {
    return this.options.isMobile || defaultValue;
  }

  get isMobile() {
    return this.options.isMobile ?? false;
  }

  set isMobile(value: boolean) {
    this.options.isMobile = value;
  }

  private overrideThemeOptions(themeOptions: ThemeOptions) {
    return deepMerge(this.themeOptions, themeOptions);
  }

  overrideTheme(themeOptions: ThemeOptions) {
    const options = this.overrideThemeOptions(themeOptions);
    return buildTheme(options);
  }
}
