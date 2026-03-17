import type { ThemeOptions } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';
import { type Context, createContext } from 'react';

import MomentConfigMap from '../configs/momentConfig';
import type {
  LocalizationConfig,
  ProjectId,
  StoriesAPIFormatters,
  StoryIdActionDefinition,
} from '../types';
import APIStore, { type APIStoreOptions } from './apiStore';
import AVStore from './avStore';
import CollectionsStore from './collectionsStore';
import DOMStore from './domStore';
import FormattersStore from './formattersStore';
import GeoMapsStore from './geoMapsStore';
import LocaleStore from './localeStore';
import MenusStore from './menusStore';
import StoriesStore from './storiesStore';
import ThemeStore from './themeStore';

export type RootStoreOptions = {
  readonly api?: APIStoreOptions;
  readonly formatters?: Partial<StoriesAPIFormatters>;
  readonly localization?: LocalizationConfig;
  readonly projectId?: ProjectId;
  readonly goToPath?: (path: string) => void;
  readonly isDebugging?: boolean;
  readonly isMobile?: boolean;
  readonly storyIdActions?: Record<string, StoryIdActionDefinition>;
  readonly themeOptions?: ThemeOptions;
};

export default class RootStore {
  api: APIStore;

  av: AVStore;

  collections: CollectionsStore;

  static contextInstance: Context<RootStore>;

  dom: DOMStore;

  formatters: FormattersStore;

  locale: LocaleStore;

  menus: MenusStore;

  geoMaps: GeoMapsStore;

  goToPath?: (path: string) => void;

  isDebugging = false;

  momentConfigMap = MomentConfigMap;

  projectId?: ProjectId;

  stories: StoriesStore;

  storyIdActions: Record<string, StoryIdActionDefinition>;

  theme: ThemeStore;

  constructor({
    api,
    formatters,
    localization,
    goToPath,
    isDebugging = false,
    isMobile,
    projectId,
    storyIdActions,
    themeOptions,
  }: RootStoreOptions = {}) {
    makeAutoObservable(this);
    this.api = new APIStore(this, api);
    this.av = new AVStore(this);
    this.collections = new CollectionsStore(this);
    this.dom = new DOMStore(this);
    this.formatters = new FormattersStore(this, formatters);
    this.geoMaps = new GeoMapsStore(this);
    this.goToPath = goToPath;
    this.locale = new LocaleStore(this, localization);
    this.menus = new MenusStore(this);
    this.stories = new StoriesStore(this);
    this.theme = new ThemeStore(this, { isMobile, themeOptions });
    this.isDebugging = isDebugging;
    this.projectId = projectId;
    this.storyIdActions = storyIdActions ?? {};
  }

  static initContext() {
    RootStore.contextInstance = RootStore.contextInstance || createContext(new RootStore());
    return RootStore.contextInstance;
  }
}
