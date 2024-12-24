import {
  capitalizeEachWord,
  capitalizeFirstWord,
  ipc,
  type L10NBundle,
} from "@yandex-games-sdk/common";
// @ts-ignore
import { EDITOR } from "cc/env";
import {
  createInstance,
  type i18n,
  type InitOptions as I18NextInitOptions,
} from "i18next";
import type { ISO_639_1 } from "ysdk";

import { fetchL10NBundle } from "./bundle";

export type TranslateOptions = {
  postProcess: "capitalize_first" | "capitalize" | "uppercase" | "lowercase";
};

const L10N_NAMESPACE = "translations";

export class L10NManager {
  private _i18next?: i18n;
  private l10nBundle?: L10NBundle;

  currentLanguage?: ISO_639_1;

  static instance = new L10NManager();

  private async init() {
    this.l10nBundle = await fetchL10NBundle();

    this.currentLanguage = this.l10nBundle.defaultLanguage;

    const translations = this.l10nBundle.translations;
    for (const [key, obj] of Object.entries(translations)) {
      const buffer = new Object();
      buffer[L10N_NAMESPACE as keyof typeof buffer] = obj;
      translations[key as keyof typeof translations] = buffer;
    }

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
      for (const [key, obj] of Object.entries(translations)) {
        const buffer = new Object();
        buffer[L10N_NAMESPACE as keyof typeof buffer] = obj;
        translations[key as keyof typeof translations] = buffer;
      }

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

  public async changeLanguage(code: ISO_639_1) {
    this.currentLanguage = code;
    this._i18next?.changeLanguage(code);
  }

  public getLanguage() {
    return this._i18next?.language as ISO_639_1;
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
        return capitalizeFirstWord(text);
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
