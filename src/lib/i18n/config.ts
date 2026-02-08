// Locale configuration
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Locale metadata
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};

// Helper to validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
