import { MainMethods } from "@common";
import {
  exportCocosL10nTranslations,
  importCocosL10nTranslations,
} from "./cocosTranlsations";
import { getL10NBundle } from "./l10nBundle";
import { checkTemplates, generateTemplates } from "./templates";

export const methods: MainMethods = {
  openLocalizationEditor() {
    Editor.Panel.open("yandex-games-sdk.localization-editor");
  },
  openCocosL10nExporter() {
    Editor.Panel.open("yandex-games-sdk.cocos-translations-exporter");
  },
  getL10NBundle,
  generateTemplates,
  checkTemplates,
  exportCocosL10nTranslations,
  importCocosL10nTranslations,
};

export async function load() {
  // Check templates on startup
  methods.checkTemplates();
}

export function unload() {}
