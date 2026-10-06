import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://domain-anda.com',

  i18n: {
    defaultLocale: 'en',              // ← INGGRIS jadi default
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,     // EN di '/', ID di '/id/'
    },
  },
});