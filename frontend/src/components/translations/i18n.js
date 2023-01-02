import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import loadTranslations from './loadTranslations';

const backendOptions = {
  loadPath: '{{lng}}|{{ns}}',
  request: (options, url, payload, callback) => {
    try {
      const [lng] = url.split('|');
      loadTranslations(lng).then(response => {
        callback(null, {
          data: response,
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init(
    {
      lng: 'de',
      fallbackLng: 'de',
      keySeparator: false, // we do not use keys in form messages.welcome
      backend: backendOptions,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      react: {
        transSupportBasicHtmlNodes: true,
      },
    },
    err => {
      if (err) return console.error('something went wrong loading', err);
    },
  );

export default i18n;
