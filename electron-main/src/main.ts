import * as fs from "fs-extra";
import { join } from "path";
import {
  log,
  warn,
  error,
  isLanguageCode,
  LanguageCode,
  L10NBundle,
  MainMethods,
} from "@common";

const pluginRoot = join(__dirname, "../../../");

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/"
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}

export const methods: MainMethods = {
  openLocalizationEditor() {
    Editor.Panel.open("yandex-games-sdk.localization-editor");
  },
  generateTemplates() {
    [
      "build-templates/web-desktop",
      "build-templates/web-mobile",
      "preview-template",
    ].forEach((path) => {
      const projectPath = join(Editor.Project.path, path);

      if (fs.existsSync(projectPath)) {
        error(path + " template already exists!");
        return;
      }

      const templatePath = join(pluginRoot, "static/templates/" + path);
      fs.copySync(templatePath, join(Editor.Project.path, path));

      log("Successfully created " + path + " template!");
    });
  },
  checkTemplates() {
    let ok = true;

    [
      "build-templates/web-desktop/index.ejs",
      "build-templates/web-mobile/index.ejs",
      "preview-template/index.ejs",
    ].forEach((path) => {
      const projectPath = join(Editor.Project.path, path);

      if (!fs.existsSync(projectPath)) {
        warn("Failed to find " + path.replace("/index.ejs", "") + " template!");
        ok = false;
        return;
      }

      if (
        !fs
          .readFileSync(projectPath, "utf-8")
          .includes("https://yandex.ru/games/sdk/v2")
      ) {
        warn(
          "Your " +
            path.replace("/index.ejs", "") +
            " template doesn't have YandexGames.SDK imported!"
        );
        ok = false;
        return;
      }
    });

    if (ok) log("Templates looks fine!");
  },
  getL10NBundle(): L10NBundle {
    const languages = fs
      .readdirSync(translateDataRoot)
      .filter(
        (name) =>
          ".json" === name.slice(-5) && isLanguageCode(name.slice(0, -5))
      )
      .map((n) => n.slice(0, -5) as LanguageCode);

    return {
      defaultLanguage: "en",
      translations: languages.reduce((obj, lang) => {
        const json = JSON.parse(
          fs.readFileSync(join(translateDataRoot, lang + ".json"), "utf-8")
        );
        obj[lang] = json;
        return obj;
      }, {} as { [K in LanguageCode]?: any }),
    };
  },
};

export async function load() {
  // Check templates on startup
  methods.checkTemplates();
}

export function unload() {}
