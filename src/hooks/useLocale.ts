import LocaleStore from '../state/localeStore';
import useStoriesAPI from './useStoriesAPI';

export default function useLocale(): {
  locale: LocaleStore;
  t: (key: string) => string;
} {
  const { locale } = useStoriesAPI();
  return {
    locale,
    t: locale.translate.bind(locale),
  };
}
