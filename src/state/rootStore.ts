import type { ThemeOptions } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';
import { type Context, createContext } from 'react';

import MomentConfigMap from '../configs/momentConfig';
import type { StoriesAPIFormatters } from '../types';
import AVStore from './avStore';
import CollectionsStore from './collectionsStore';
import FormattersStore from './formattersStore';
import StoriesStore from './storiesStore';
import ThemeStore from './themeStore';

export type RootStoreOptions = {
  readonly formatters?: Partial<StoriesAPIFormatters>;
  readonly goToPath?: (path: string) => void;
  readonly isDebugging?: boolean;
  readonly isMobile?: boolean;
  readonly themeOptions?: ThemeOptions;
};

export default class RootStore {
  av: AVStore;

  collections: CollectionsStore;

  static contextInstance: Context<RootStore>;

  formatters: FormattersStore;

  goToPath?: (path: string) => void;

  isDebugging = false;

  momentConfigMap = MomentConfigMap;

  stories: StoriesStore;

  theme: ThemeStore;

  constructor({
    formatters,
    goToPath,
    isDebugging = false,
    isMobile,
    themeOptions,
  }: RootStoreOptions = {}) {
    makeAutoObservable(this);
    this.av = new AVStore(this);
    this.collections = new CollectionsStore(this);
    this.formatters = new FormattersStore(this, formatters);
    this.goToPath = goToPath;
    this.stories = new StoriesStore(this);
    this.theme = new ThemeStore(this, { isMobile, themeOptions });
    this.isDebugging = isDebugging;
  }

  static initContext() {
    RootStore.contextInstance = RootStore.contextInstance || createContext(new RootStore());
    return RootStore.contextInstance;
  }
}
