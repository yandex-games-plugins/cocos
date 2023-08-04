import { ISO_639_1 } from "ysdk";
import {
  capitalizeEachWord,
  capitalizeFirstLetter,
  ipc,
  L10NBundle,
  LanguageCode,
} from "../common";
import { L10NBundleManager } from "./bundle-manager";
import {
  createInstance,
  i18n,
  InitOptions as I18NextInitOptions,
} from "i18next";
import { EDITOR } from "cc/env";
import { IL10NManager } from "../common";

export type TranslateOptions = {
  postProcess: "capitalize_first" | "capitalize" | "uppercase" | "lowercase";
};

const L10N_NAMESPACE = "translations";

export class L10NManager implements IL10NManager {
  private _i18next?: i18n;
  private l10nBundle?: L10NBundle;

  currentLanguage?: ISO_639_1;

  static instance = new L10NManager();

  constructor() {}

  private async init() {
    this.l10nBundle = await new L10NBundleManager().load();

    this.currentLanguage = this.l10nBundle.defaultLanguage;

    const translations = this.l10nBundle.translations;
    Object.entries(translations).forEach(([key, obj]) => {
      const buffer = new Object();
      buffer[L10N_NAMESPACE as keyof typeof buffer] = obj;
      translations[key as keyof typeof translations] = buffer;
    });

    this._i18next = createInstance();
    const i18nextOptions: I18NextInitOptions = {
      lng: this.currentLanguage,
      resources: translations,
      defaultNS: L10N_NAMESPACE,
      fallbackLng: this.l10nBundle.defaultLanguage,
    };
    await this._i18next.init(i18nextOptions);
  }

  public async reload() {
    if (EDITOR) {
      this.l10nBundle = await ipc.main.request("get-l10n-bundle");
      const newI18Ninstance = createInstance();

      const translations = this.l10nBundle.translations;
      Object.entries(translations).forEach(([key, obj]) => {
        const buffer = new Object();
        buffer[L10N_NAMESPACE as keyof typeof buffer] = obj;
        translations[key as keyof typeof translations] = buffer;
      });

      const i18nextOptions: I18NextInitOptions = {
        lng: this.currentLanguage,
        resources: this.l10nBundle.translations,
        defaultNS: L10N_NAMESPACE,
        fallbackLng: this.l10nBundle.defaultLanguage,
      };
      await newI18Ninstance.init(i18nextOptions);
      this._i18next = newI18Ninstance;
    }
  }

  public async changeLanguage(code: LanguageCode) {
    this.currentLanguage = code;
    this._i18next?.changeLanguage(code);
  }

  public getLanguage() {
    return this._i18next?.language as LanguageCode;
  }

  public isInitialized(): boolean {
    return this._i18next?.isInitialized ?? false;
  }

  t(key: string, options?: Partial<TranslateOptions>): string {
    if (!this._i18next) return key;

    const text = this._i18next.t(key);

    if (!options) return text;

    switch (options.postProcess) {
      case "capitalize_first":
        return capitalizeFirstLetter(text);
      case "capitalize":
        return capitalizeEachWord(text);
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      default:
        return text;
    }
  }
}
