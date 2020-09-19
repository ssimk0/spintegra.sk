import sk from '../lang/sk.json';
import i18next from 'i18next';

i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'sk', // 'en' | 'es'
    // Using simple hardcoded resources for simple example
    resources: {
      sk: {
        translation: sk
      }
    },
  })

const i18n = i18next;

export default i18n;
