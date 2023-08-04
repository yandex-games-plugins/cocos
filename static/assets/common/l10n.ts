import { LanguageCode } from "./localization";

export type L10NBundle = {
  defaultLanguage: LanguageCode;
  translations: { [K in LanguageCode]?: any };
};

export interface IL10NManager {
  isInitialized(): boolean;
  reload(): Promise<void>;
  changeLanguage(code: LanguageCode): Promise<void>;
  getLanguage(): LanguageCode;
}
