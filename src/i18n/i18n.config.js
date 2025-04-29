//save i18n config for reference

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enUsTranslationCommon from "locales/en/common.json";
import frTranslationCommon from "locales/fr/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enUsTranslationCommon,
      },
      fr: {
        common: frTranslationCommon,
      },
    },
    fallbackLng: "en-US",
    ns: ["common", "userProfile", "dashboard"],
    supportedLngs: ["en-US", "en-CA", "de"],
    nonExplicitSupportedLngs: false,
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
