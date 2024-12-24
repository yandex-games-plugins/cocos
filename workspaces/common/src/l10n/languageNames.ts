const LANGUAGE_NAMES = {
  af: {
    name: "afrikaans",
    nativeName: "afrikaans",
  },
  am: {
    name: "amharic",
    nativeName: "አማርኛ",
  },
  ar: {
    name: "arabic",
    nativeName: "اَلْعَرَبِيَّةُ",
  },
  az: {
    name: "azerbaijani",
    nativeName: "azərbaycan dili",
  },
  be: {
    name: "belarusian",
    nativeName: "беларуская мова",
  },
  bg: {
    name: "bulgarian",
    nativeName: "български език",
  },
  bn: {
    name: "bengali",
    nativeName: "বাংলা",
  },
  ca: {
    name: "catalan",
    nativeName: "català",
  },
  cs: {
    name: "czech",
    nativeName: "čeština",
  },
  da: {
    name: "danish",
    nativeName: "dansk",
  },
  de: {
    name: "german",
    nativeName: "deutsch",
  },
  el: {
    name: "greek",
    nativeName: "ελληνικά",
  },
  en: {
    name: "english",
    nativeName: "english",
  },
  es: {
    name: "spanish",
    nativeName: "español",
  },
  et: {
    name: "estonian",
    nativeName: "eesti",
  },
  eu: {
    name: "basque",
    nativeName: "euskara",
  },
  fa: {
    name: "persian",
    nativeName: "فارسی",
  },
  fi: {
    name: "finnish",
    nativeName: "suomi",
  },
  fr: {
    name: "french",
    nativeName: "français",
  },
  gl: {
    name: "galician",
    nativeName: "galego",
  },
  he: {
    name: "hebrew",
    nativeName: "עברית",
  },
  hi: {
    name: "hindi",
    nativeName: "हिन्दी",
  },
  hr: {
    name: "croatian",
    nativeName: "hrvatski",
  },
  hu: {
    name: "hungarian",
    nativeName: "magyar",
  },
  hy: {
    name: "armenian",
    nativeName: "հայերեն",
  },
  id: {
    name: "indonesian",
    nativeName: "bahasa indonesia",
  },
  is: {
    name: "icelandic",
    nativeName: "íslenska",
  },
  it: {
    name: "italian",
    nativeName: "italiano",
  },
  ja: {
    name: "japanese",
    nativeName: "日本語",
  },
  ka: {
    name: "georgian",
    nativeName: "ქართული",
  },
  kk: {
    name: "kazakh",
    nativeName: "қазақ тілі",
  },
  km: {
    name: "khmer",
    nativeName: "ខេមរភាសា",
  },
  kn: {
    name: "kannada",
    nativeName: "ಕನ್ನಡ",
  },
  ko: {
    name: "korean",
    nativeName: "한국어",
  },
  ky: {
    name: "kyrgyz",
    nativeName: "кыргызча",
  },
  lo: {
    name: "lao",
    nativeName: "ພາສາລາວ",
  },
  lt: {
    name: "lithuanian",
    nativeName: "lietuvių kalba",
  },
  lv: {
    name: "latvian",
    nativeName: "latviešu valoda",
  },
  mk: {
    name: "macedonian",
    nativeName: "македонски јазик",
  },
  ml: {
    name: "malayalam",
    nativeName: "മലയാളം",
  },
  mn: {
    name: "mongolian",
    nativeName: "монгол хэл",
  },
  mr: {
    name: "marathi",
    nativeName: "मराठी",
  },
  ms: {
    name: "malay",
    nativeName: "bahasa melayu",
  },
  my: {
    name: "burmese",
    nativeName: "ဗမာစာ",
  },
  ne: {
    name: "nepali",
    nativeName: "नेपाली",
  },
  nl: {
    name: "dutch",
    nativeName: "nederlands",
  },
  no: {
    name: "norwegian",
    nativeName: "norsk",
  },
  pl: {
    name: "polish",
    nativeName: "polski",
  },
  pt: {
    name: "portuguese",
    nativeName: "português",
  },
  ro: {
    name: "romanian",
    nativeName: "română",
  },
  ru: {
    name: "russian",
    nativeName: "русский",
  },
  si: {
    name: "sinhala",
    nativeName: "සිංහල",
  },
  sk: {
    name: "slovak",
    nativeName: "slovenčina",
  },
  sl: {
    name: "slovenian",
    nativeName: "slovenščina",
  },
  sr: {
    name: "serbian",
    nativeName: "српски језик",
  },
  sv: {
    name: "swedish",
    nativeName: "svenska",
  },
  sw: {
    name: "swahili",
    nativeName: "kiswahili",
  },
  ta: {
    name: "tamil",
    nativeName: "தமிழ்",
  },
  te: {
    name: "telugu",
    nativeName: "తెలుగు",
  },
  tg: {
    name: "tajik",
    nativeName: "тоҷикӣ",
  },
  th: {
    name: "thai",
    nativeName: "ไทย",
  },
  tk: {
    name: "turkmen",
    nativeName: "türkmençe",
  },
  tl: {
    name: "tagalog",
    nativeName: "wikang tagalog",
  },
  tr: {
    name: "turkish",
    nativeName: "türkçe",
  },
  uk: {
    name: "ukrainian",
    nativeName: "українська",
  },
  ur: {
    name: "urdu",
    nativeName: "اردو",
  },
  uz: {
    name: "uzbek",
    nativeName: "ўзбек",
  },
  vi: {
    name: "vietnamese",
    nativeName: "tiếng việt",
  },
  zh: {
    name: "chinese",
    nativeName: "中文",
  },
  zu: {
    name: "zulu",
    nativeName: "isizulu",
  },
};

export const languageName = (code: string): string =>
  LANGUAGE_NAMES[code]?.name ?? "";

export const languageNativeName = (code: string): string =>
  LANGUAGE_NAMES[code]?.nativeName ?? "";
