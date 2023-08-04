import * as fs from "fs-extra";
import { join } from "path";
import { LanguageCode, SceneMethods, getLanguageName } from "@common";
import { l10nWrapper } from "./l10n-wrapper";

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/"
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}

export const methods: SceneMethods = {
  async reload() {
    await l10nWrapper.reload();
    Editor.Message.send("scene", "soft-reload");
  },
  async changeLanguage(code: LanguageCode) {
    await l10nWrapper.changeLanguage(code);
    Editor.Message.send("scene", "soft-reload");
  },
  async getLanguage() {
    return await l10nWrapper.getLanguage();
  },
};

export async function load() {}

export function unload() {}
