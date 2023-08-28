import * as fs from "fs-extra";
import { join } from "path";
import { log, warn } from "@common";

const pluginRoot = join(__dirname, "../../../../");
export function checkTemplates() {
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
}
export function generateTemplates() {
  [
    "build-templates/web-desktop",
    "build-templates/web-mobile",
    "preview-template",
  ].forEach((path) => {
    const projectPath = join(Editor.Project.path, path);

    if (fs.existsSync(projectPath)) {
      warn(path + " template already exists!");
      return;
    }

    const templatePath = join(pluginRoot, "static/templates/" + path);
    fs.copySync(templatePath, join(Editor.Project.path, path));

    log("Successfully created " + path + " template!");
  });
}
