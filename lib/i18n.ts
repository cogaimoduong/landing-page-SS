export const supportedLocales = ["en", "vi"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "devdes_locale";

export type LocalizedText = Partial<Record<Locale, string>>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && supportedLocales.includes(value as Locale);
}

export function localeFrom(value: unknown, fallback: Locale = defaultLocale): Locale {
  return isLocale(value) ? value : fallback;
}

/**
 * Reads new bilingual values and legacy string values with one stable fallback
 * order. Keeping string support makes existing MongoDB documents safe to read
 * while content is translated incrementally.
 */
export function localizeText(
  value: LocalizedText | string | undefined | null,
  locale: Locale,
): string {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[locale] ?? value.en ?? value.vi ?? "";
}

export function localized(en: string, vi?: string): LocalizedText {
  return vi ? { en, vi } : { en };
}
