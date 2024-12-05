import { Locale } from "@/types/locale";

export const locales = ['en', 'fr'] as const;
export const localePrefix = 'always';
export const defaultLocale: Locale = 'en';
export const localeDetection = false;

export const localeNames: Record<Locale, string> = {
    en: 'English',
    fr: 'Francais',
};

export const localeCodes: Record<string, Locale> = {
    en: 'en',
    fr: 'fr',
};