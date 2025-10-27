import type { Theme } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';

import localizationConfig from '../configs/localizationConfig';
import type { LocalizationConfig } from '../types';
import { isRTL } from '../utils/locale';
import { deepMerge } from '../utils/object';
import type RootStore from './rootStore';

export default class LocaleStore {
  config: LocalizationConfig;

  locale = 'en';

  root: RootStore;

  constructor(root: RootStore, config?: Partial<LocalizationConfig>) {
    this.root = root;
    this.config = deepMerge(localizationConfig, config);
    this.locale = this.config.defaultLocale || 'en';
    makeAutoObservable(this);
  }

  get currentLocale() {
    return this.locale;
  }

  get defaultLocale() {
    return this.config.defaultLocale || 'en';
  }

  get defaultTranslations() {
    return this.config.translations[this.defaultLocale] || {};
  }

  get hasAlternativeLocales(): boolean {
    return this.supportedLocales.length > 1;
  }

  get hasAvailableLocales(): boolean {
    return this.supportedLocales.length > 0;
  }

  get isRTL(): boolean {
    return isRTL(this.locale);
  }

  get setting() {
    return this.getLocaleSetting(this.locale);
  }

  get supportedLocales() {
    return this.config.supportedLocales;
  }

  get supportedLanguages() {
    return this.supportedLocales
      .map((locale) => this.getLocaleSetting(locale));
  }

  get themeOptions(): Partial<Theme> {
    return this.setting.muiThemeOptions || {};
  }

  get translations() {
    return this.config.translations[this.locale] || {};
  }

  getLocaleSetting(locale: string) {
    const setting = {
      locale,
      ...this.config.localeSettings[locale],
    };
    if (typeof setting.rtl !== 'boolean') {
      setting.rtl = isRTL(locale);
    }
    return setting;
  }

  async onLocaleChange() {
    await Promise.all([
      this.root.collections.onLocaleChange(),
      this.root.stories.onLocaleChange(),
    ]);
  }

  setLocale(locale: string) {
    if (this.locale === locale) {
      return;
    }
    this.locale = locale;
    this.onLocaleChange();
  }

  translate(key: string): string {
    return this.translations[key] || this.defaultTranslations[key] || key;
  }
}
