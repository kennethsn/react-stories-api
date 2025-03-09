import type { ThemeOptions } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';
import { type Context, createContext } from 'react';

import MomentConfigMap from '../configs/momentConfig';
import type { ProjectId, StoriesAPIFormatters } from '../types';
import APIStore, { type APIStoreOptions } from './apiStore';
import AVStore from './avStore';
import CollectionsStore from './collectionsStore';
import DOMStore from './domStore';
import FormattersStore from './formattersStore';
import StoriesStore from './storiesStore';
import ThemeStore from './themeStore';

export type RootStoreOptions = {
  readonly api?: APIStoreOptions;
  readonly formatters?: Partial<StoriesAPIFormatters>;
  readonly projectId?: ProjectId;
  readonly goToPath?: (path: string) => void;
  readonly isDebugging?: boolean;
  readonly isMobile?: boolean;
  readonly themeOptions?: ThemeOptions;
};

export default class RootStore {
  api: APIStore;

  av: AVStore;

  collections: CollectionsStore;

  static contextInstance: Context<RootStore>;

  dom: DOMStore;

  formatters: FormattersStore;

  goToPath?: (path: string) => void;

  isDebugging = false;

  momentConfigMap = MomentConfigMap;

  projectId?: ProjectId;

  stories: StoriesStore;

  theme: ThemeStore;

  constructor({
    api,
    formatters,
    goToPath,
    isDebugging = false,
    isMobile,
    projectId,
    themeOptions,
  }: RootStoreOptions = {}) {
    makeAutoObservable(this);
    this.api = new APIStore(this, api);
    this.av = new AVStore(this);
    this.collections = new CollectionsStore(this);
    this.dom = new DOMStore(this);
    this.formatters = new FormattersStore(this, formatters);
    this.goToPath = goToPath;
    this.stories = new StoriesStore(this);
    this.theme = new ThemeStore(this, { isMobile, themeOptions });
    this.isDebugging = isDebugging;
    this.projectId = projectId;
  }

  static initContext() {
    RootStore.contextInstance = RootStore.contextInstance || createContext(new RootStore());
    return RootStore.contextInstance;
  }
}
