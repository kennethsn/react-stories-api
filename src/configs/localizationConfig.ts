import {
  arEG,
  enUS,
  esES,
  frFR,
} from '@mui/material/locale';

import type { LocalizationConfig } from '../types';

const localizationConfig: LocalizationConfig = {
  defaultLocale: 'en',
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
  supportedLocales: ['en'],
  // Note: Convention is to use dot.notation for reference keys
  // and pascal_case for direct translations
  translations: {
    ar: {
      'collection.featuredStory.buttonLabel': 'عرض القصة المميزة',
      'collection.storiesList.header': 'استكشف جمیع القصص من مجموعة {collection_name}',
      'story.collectionButtonLabel': 'استكشف المزيد من القصص',
      cancel: 'إلغاء',
      download: 'تنزيل',
      learn_more: 'اعرف المزید',
      reset: 'إعادة تعيين',
      save: 'حفظ',
      save_failed: 'فشل الحفظ. يرجى إعادة التعيين أو المحاولة مرة أخرى.',
      save_success: 'تم الحفظ بنجاح!',
      see_more_options: 'عرض المزيد من الخيارات',
      select_language: 'اختر اللغة',
      view_collection: 'تصفح المجموعة',
      welcome: 'مرحبًا',
    },
    en: {
      'collection.featuredStory.buttonLabel': 'View Featured Story',
      'collection.storiesList.header': 'Explore All Stories from the {collection_name} Collection',
      'story.collectionButtonLabel': 'Explore More Stories',
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
      'collection.featuredStory.buttonLabel': 'Ver historia destacada',
      'collection.storiesList.header': 'Explorar todas las historias de la colección {collection_name}',
      'story.collectionButtonLabel': 'Explorar más historias',
      cancel: 'Cancelar',
      save: 'Guardar',
      select_language: 'Seleccionar idioma',
      welcome: 'Bienvenido',
    },
    fr: {
      'collection.storiesList.header': 'Explorer toutes les histoires de la collection {collection_name}',
      'story.collectionButtonLabel': 'Explorer plus d\'histoires',
      cancel: 'Annuler',
      download: 'Télécharger',
      learn_more: 'En savoir plus',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
      save_failed: "Échec de l'enregistrement. Veuillez réinitialiser ou réessayer.",
      save_success: 'Enregistré avec succès !',
      see_more_options: 'Voir plus d’options',
      select_language: 'Choisir la langue',
      view_collection: 'Voir la collection',
      welcome: 'Bienvenue',
    },

  },
};

export default localizationConfig;
