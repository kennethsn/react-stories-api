import {
  arEG,
  enUS,
  esES,
  frFR,
} from '@mui/material/locale';

import type { LocalizationConfig } from '../types';

const localizationConfig: LocalizationConfig = {
  defaultLocale: 'en',
  supportedLocales: ['en'],
  localeSettings: {
    ar: {
      label: 'Arabic',
      muiThemeOptions: arEG,
      nativeLabel: 'العربية',
      rtl: true,
    },
    en: {
      label: 'English',
      muiThemeOptions: enUS,
      nativeLabel: 'English',
      rtl: false,
    },
    es: {
      label: 'Spanish',
      muiThemeOptions: esES,
      nativeLabel: 'Español',
      rtl: false,
    },
    fr: {
      label: 'French',
      muiThemeOptions: frFR,
      nativeLabel: 'Français',
      rtl: false,
    },
  },
  translations: {
    ar: {
      cancel: 'إلغاء',
      select_language: 'اختر اللغة',
      save: 'حفظ',
      welcome: 'أهلاً بك',
    },
    en: {
      cancel: 'Cancel',
      save: 'Save',
      select_language: 'Select Language',
      welcome: 'Welcome',
    },
    es: {
      cancel: 'Cancelar',
      save: 'Guardar',
      select_language: 'Seleccionar idioma',
      welcome: 'Bienvenido',
    },
    fr: {
      cancel: 'Annuler',
      save: 'Enregistrer',
      select_language: 'Choisir la langue',
      welcome: 'Bienvenue',
    },

  },
};

export default localizationConfig;
