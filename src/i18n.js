import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

const en = require('../public/locales/en.json');
const pt = require('../public/locales/pt.json');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: 'common',
    defaultNS: 'common',
    lowerCaseLng: true,
    nonExplicitWhitelist: true,

    lng: 'en',
    fallbackLng: 'en',
    debug: false,

    resources: {
      en,
      pt,
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
