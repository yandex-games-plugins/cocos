import { TopLevelDomain } from "ysdk";

export const LanguageCode = {
  AF: "af",
  AM: "am",
  AR: "ar",
  AZ: "az",
  BE: "be",
  BG: "bg",
  BN: "bn",
  CA: "ca",
  CS: "cs",
  DA: "da",
  DE: "de",
  EL: "el",
  EN: "en",
  ES: "es",
  ET: "et",
  EU: "eu",
  FA: "fa",
  FI: "fi",
  FR: "fr",
  GL: "gl",
  HE: "he",
  HI: "hi",
  HR: "hr",
  HU: "hu",
  HY: "hy",
  ID: "id",
  IS: "is",
  IT: "it",
  JA: "ja",
  KA: "ka",
  KK: "kk",
  KM: "km",
  KN: "kn",
  KO: "ko",
  KY: "ky",
  LO: "lo",
  LT: "lt",
  LV: "lv",
  MK: "mk",
  ML: "ml",
  MN: "mn",
  MR: "mr",
  MS: "ms",
  MY: "my",
  NE: "ne",
  NL: "nl",
  NO: "no",
  PL: "pl",
  PT: "pt",
  RO: "ro",
  RU: "ru",
  SI: "si",
  SK: "sk",
  SL: "sl",
  SR: "sr",
  SV: "sv",
  SW: "sw",
  TA: "ta",
  TE: "te",
  TG: "tg",
  TH: "th",
  TK: "tk",
  TL: "tl",
  TR: "tr",
  UK: "uk",
  UR: "ur",
  UZ: "uz",
  VI: "vi",
  ZH: "zh",
  ZU: "zu",
} as const;

export type LanguageCode = (typeof LanguageCode)[keyof typeof LanguageCode];

const LANGUAGES_LIST = {
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
} as const;

export const getLanguageName = <TCode extends LanguageCode>(
  code: TCode
): (typeof LANGUAGES_LIST)[TCode]["name"] => LANGUAGES_LIST[code].name;

export const getLanguageNativeName = <TCode extends LanguageCode>(
  code: TCode
): (typeof LANGUAGES_LIST)[TCode]["nativeName"] =>
  LANGUAGES_LIST[code].nativeName;

const validCodes = Object.keys(LANGUAGES_LIST);
export const isLanguageCode = (str: string) => {
  if (str.length != 2) return false;
  return validCodes.includes(str.toLowerCase());
};

const TLD2LangCodeMap = {
  az: "az",
  by: "be",
  "co.il": "he",
  com: "en",
  "com.am": "hy",
  "com.ge": "ka",
  "com.tr": "tr",
  ee: "et",
  fr: "fr",
  kz: "kk",
  kg: "ky",
  lt: "lt",
  lv: "lv",
  md: "ro",
  ru: "ru",
  tj: "tg",
  tm: "tk",
  ua: "uk",
  uz: "uz",
} as const;

export const domainToLanguageCode = <T extends TopLevelDomain>(
  domain: T
): (typeof TLD2LangCodeMap)[T] => TLD2LangCodeMap[domain];
