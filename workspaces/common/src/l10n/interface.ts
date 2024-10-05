import type { ISO_639_1 } from "ysdk";

export type L10NBundle = {
  defaultLanguage: ISO_639_1;
  translations: { [K in ISO_639_1]?: any };
};

export interface IL10NManager {
  isInitialized(): boolean;
  reload(): Promise<void>;
  changeLanguage(code: ISO_639_1): Promise<void>;
  getLanguage(): ISO_639_1;
}
