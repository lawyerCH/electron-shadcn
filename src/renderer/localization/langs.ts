export interface Language {
  key: string;
  nativeName: string;
  prefix: string;
}

export default [
  {
    key: "zh-CN",
    nativeName: "简体中文",
    prefix: "ZH-CN",
  },
  {
    key: "zh-TW",
    nativeName: "繁體中文",
    prefix: "ZH-TW",
  },
  {
    key: "en",
    nativeName: "English",
    prefix: "EN-US",
  },
  {
    key: "ja",
    nativeName: "日本語",
    prefix: "JA-JP",
  },
  {
    key: "pt-BR",
    nativeName: "Português (Brasil)",
    prefix: "PT-BR",
  },
] as const satisfies readonly Language[];
