import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import translationEN from "../data/locales/en.json";
import translationVI from "../data/locales/vi.json";
const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

i18n.use(I18NextHttpBackend).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: true,
});

export default i18n;
