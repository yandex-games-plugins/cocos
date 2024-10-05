import { join } from "path";
import {
  type L10NBundle,
  type MainMethods,
  isLanguageCode,
  logger,
} from "@yandex-games-sdk/common";
import * as fs from "fs-extra";
import type { ISO_639_1 } from "ysdk";

const pluginRoot = join(__dirname, "../../../");

const translateDataRoot = join(Editor.Project.path, "yandex-games-sdk/translate-data/");
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}

export const methods: MainMethods = {
  openLocalizationEditor() {
    Editor.Panel.open("yandex-games-sdk.localization-editor");
  },

  generateTemplates() {
    for (const path of [
      "build-templates/web-desktop",
      "build-templates/web-mobile",
      "preview-template",
    ]) {
      const projectPath = join(Editor.Project.path, path);

      if (fs.existsSync(projectPath)) {
        logger.info(`${path} template already exists!`);
        continue;
      }

      const templatePath = join(pluginRoot, `static/templates/${path}`);
      fs.copySync(templatePath, join(Editor.Project.path, path));

      logger.info(`Successfully created ${path} template!`);
    }
  },

  checkTemplates() {
    let ok = true;

    for (const path of [
      "build-templates/web-desktop/index.ejs",
      "build-templates/web-mobile/index.ejs",
      "preview-template/index.ejs",
    ]) {
      const projectPath = join(Editor.Project.path, path);

      if (!fs.existsSync(projectPath)) {
        logger.warn(`Failed to find ${path.replace("/index.ejs", "")} template!`);
        ok = false;
        continue;
      }

      if (!fs.readFileSync(projectPath, "utf-8").includes("https://yandex.ru/games/sdk/v2")) {
        logger.warn(
          `Your ${path.replace("/index.ejs", "")} template doesn't have YandexGames.SDK imported!`,
        );
        ok = false;
      }
    }

    if (ok) logger.info("Templates looks fine!");
  },

  getL10NBundle(): L10NBundle {
    const languages = fs
      .readdirSync(translateDataRoot)
      .filter((name) => ".json" === name.slice(-5) && isLanguageCode(name.slice(0, -5)))
      .map((n) => n.slice(0, -5) as ISO_639_1);

    return {
      defaultLanguage: "en",
      translations: languages.reduce(
        (obj, lang) => {
          const json = JSON.parse(
            fs.readFileSync(join(translateDataRoot, `${lang}.json`), "utf-8"),
          );
          obj[lang] = json;
          return obj;
        },
        {} as { [K in ISO_639_1]?: any },
      ),
    };
  },
};

export async function load() {
  // Check templates on startup
  methods.checkTemplates();
}

export function unload() {}
