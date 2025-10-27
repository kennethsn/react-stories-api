import {
  arEG,
  enUS,
  esES,
  frFR,
} from '@mui/material/locale';

import type { LocalizationConfig } from '../types';

const localizationConfig: LocalizationConfig = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'ar'],
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
      learn_more: 'اعرف المزید',
      select_language: 'اختر اللغة',
      save: 'حفظ',
      welcome: 'أهلاً بك',
      view_collection: 'تصفح المجموعة',
    },
    en: {
      cancel: 'Cancel',
      download: 'Download',
      learn_more: 'Learn More',
      reset: 'Reset',
      save: 'Save',
      save_failed: 'Failed to save. Please reset or try again',
      save_success: 'Saved Successfully!',
      see_more_options: 'See more options',
      select_language: 'Select Language',
      view_collection: 'View Collection',
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
