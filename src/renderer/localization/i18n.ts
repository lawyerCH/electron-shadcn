import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ja from "./locales/ja.json";
import ptBR from "./locales/pt-BR.json";
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    "pt-BR": { translation: ptBR },
    "zh-CN": { translation: zhCN },
    "zh-TW": { translation: zhTW },
  },
});
