import localizationConfig from '../configs/localizationConfig';

export function isRTL(locale: string): boolean {
  try {
    // Attempt using Intl.Locale (modern browsers / Node 13+)
    const intlLocale = new Intl.Locale(locale);
    // @ts-expect-error -- textInfo & direction is not yet in the type definition
    const direction = intlLocale.textInfo?.direction;
    if (direction) {
      return direction === 'rtl';
    }
  } catch (e) {
    // Intl.Locale not supported or invalid locale string
    // eslint-disable-next-line no-console
    console.warn('Intl.Locale not supported or invalid locale string', e);
  }

  // Fallback: Use hardcoded RTL language set
  const baseLang = locale.split('-')[0].toLowerCase();
  return localizationConfig.localeSettings[baseLang]?.rtl || false;
}

export default {
  isRTL,
};
