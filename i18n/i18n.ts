import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    resources: translations,
    react: {
      useSuspense: false,
    },
  });

export default i18n;