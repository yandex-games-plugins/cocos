import * as fs from "fs-extra";
import { join } from "path";
import { L10NBundle, LanguageCode, isLanguageCode } from "@common";

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/"
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}

export function getL10NBundle(): L10NBundle {
  const languages = fs
    .readdirSync(translateDataRoot)
    .filter(
      (name) => ".json" === name.slice(-5) && isLanguageCode(name.slice(0, -5))
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
}
