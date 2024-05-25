import i18n from "i18next"; // Importing the i18next library for internationalization
import I18NextHttpBackend from "i18next-http-backend"; // Importing the backend plugin for loading translations via HTTP
import { initReactI18next } from "react-i18next"; // Importing the React integration for i18next
import translationEN from "../data/locales/en.json"; // Importing English translations
import translationVI from "../data/locales/vi.json"; // Importing Vietnamese translations

// Creating a resources object that contains the translations for different languages
const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

// Initializing i18next with the necessary configurations
i18n
    .use(I18NextHttpBackend) // Using the HTTP backend plugin to load translations
    .use(initReactI18next) // Integrating i18next with React
    .init({
      resources, // Setting the translations resources
      fallbackLng: "en", // Setting the fallback language to English
      debug: true, // Enabling debug mode for development
    });

// Exporting the configured i18next instance for use in the application
export default i18n;