import id from './id.json';
import en from './en.json';

export const languages = {
  en: 'English',
  id: 'Indonesia',
} as const;

export type Lang = keyof typeof languages;

const translations = { id, en };

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return value;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'id') return 'id';
  return 'en';  // ← default English
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'id' : 'en';
}

export function translatePath(path: string, targetLang: Lang): string {
  // Hapus prefix bahasa jika ada
  const cleanPath = path.replace(/^\/id/, '') || '/';

  if (targetLang === 'en') {
    return cleanPath;
  }

  return `/id${cleanPath === '/' ? '' : cleanPath}`;
}