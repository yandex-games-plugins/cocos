import * as fs from "fs-extra";
import * as YAML from "yaml";
import JSZip from "jszip";
import { join } from "path";
import { error, log } from "@common";
import { shell } from "electron";

const CocosTranslationsPath = join(
  Editor.Project.path,
  "localization-editor/translate-data/"
);

// IF YOU CHANGE THIS, PREVIOUS EXPORTED TRANSLATIONS WILL BE UNIMPORTABLE
const PLURAL_SEPARATOR = "__";

export function exportCocosL10nTranslations(outputPath: string) {
  const yamlFiles = fs
    .readdirSync(CocosTranslationsPath)
    .filter((name) => name.endsWith(".yaml"));

  const parsedTranslations = {} as Record<string, any>;

  for (const yamlFile of yamlFiles) {
    const yamlPath = join(CocosTranslationsPath, yamlFile);
    const translateData = YAML.parse(fs.readFileSync(yamlPath, "utf-8"));

    if (translateData.locale === "index") {
      continue;
    }

    const langKey = translateData.locale.split("-")[0];

    if (!parsedTranslations[langKey]) {
      parsedTranslations[langKey] = {};
    }

    for (const item of Object.values(translateData.items) as any[]) {
      const key = item.key;

      parsedTranslations[langKey][key] = item.value;

      if (item._variants.length > 0) {
        for (const variant of item._variants) {
          const pluralKey = key + PLURAL_SEPARATOR + variant.key;
          parsedTranslations[langKey][pluralKey] = variant.value;
        }
      }
    }
  }

  const zip = new JSZip();

  for (const langKey of Object.keys(parsedTranslations)) {
    const langData = parsedTranslations[langKey];
    const langDataJSON = JSON.stringify(langData);
    zip.file(`${langKey}.js`, langDataJSON);
  }

  const zipPath = join(outputPath, "translations.zip");

  zip.generateAsync({ type: "nodebuffer" }).then((content) => {
    fs.writeFile(zipPath, content, (err) => {
      if (err) {
        error(err);
      } else {
        log("Translations saved to", zipPath);
      }
    });
  });

  shell.showItemInFolder(zipPath);
}

export function importCocosL10nTranslations(zipPath: string) {
  const indexPath = join(CocosTranslationsPath, "./index.yaml");
  const indexData = YAML.parse(fs.readFileSync(indexPath, "utf-8"));

  const translationsZip = fs.readFileSync(zipPath);

  new JSZip().loadAsync(translationsZip).then((contents) => {
    Object.values(contents.files).forEach((file) => {
      file.async("string").then((fileString) => {
        const fileData = JSON.parse(fileString);

        const langKey = file.name.split(".")[0];

        let langData: any;
        if (fs.existsSync(join(CocosTranslationsPath, `./${langKey}.yaml`))) {
          langData = YAML.parse(
            fs.readFileSync(
              join(CocosTranslationsPath, `./${langKey}.yaml`),
              "utf-8"
            )
          );
        } else {
          langData = JSON.parse(JSON.stringify(indexData));
          langData.locale = langKey;
          langData.languageConfig.bcp47Tag = langKey;
        }

        Object.keys(fileData).forEach((key) => {
          const value = fileData[key];

          if (key.includes(PLURAL_SEPARATOR)) {
            const [root, variant] = key.split(PLURAL_SEPARATOR);
            langData.items[root]._variants[variant] = {
              key: variant,
              value,
              type: 2,
              isVariant: true,
              associations: [],
              _variants: [],
            };
          } else {
            langData.items[key].value = value;
          }
        });

        const yamlPath = join(CocosTranslationsPath, `./${langKey}.yaml`);
        fs.writeFileSync(yamlPath, YAML.stringify(langData));
      });
    });
  });
}
