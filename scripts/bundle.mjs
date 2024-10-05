import fs from "node:fs";
import path from "node:path";
import archiver from "archiver";

const pkg = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf-8"));

const config = {
  folders: ["docs", "i18n", "workspaces/electron-main/dist", "workspaces/static"],
  modules: [
    "i18next",
    "regenerator-runtime",
    "@types/ysdk",
    "@cocos/creator-types",
    "@yandex-games-sdk/common",
  ],
  files: [
    "AUTHORS",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "LICENSE",
    "package.json",
    "README_ZH.md",
    "README.md",
  ],
};

const outputDir = `bundles/${pkg.version}`;

if (!fs.existsSync(path.resolve(outputDir))) {
  fs.mkdirSync(path.resolve(outputDir), { recursive: true });
}

//#region Github

{
  const bundleName = `ysdk-cc-${pkg.version}.zip`;

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.on("warning", console.warn);
  archive.on("error", console.error);

  const bundlePath = path.resolve(outputDir, bundleName);

  const stream = archive.pipe(fs.createWriteStream(bundlePath));

  for (const folder of config.folders) {
    archive.directory(folder, folder);
  }

  for (const module of config.modules) {
    archive.directory(`./node_modules/${module}`, `node_modules/${module}`);
  }

  for (const file of config.files) {
    archive.file(file, { name: file });
  }

  archive.finalize();

  stream.on("close", function () {
    const kib = (archive.pointer() / 1048576).toPrecision(3);
    console.log(`[${bundleName}] Bundle: Success (${kib} MiB)`);
  });
}

//#endregion

// #region Cocos Store

{
  const bundleName = "ysdk.zip";

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.on("warning", console.warn);
  archive.on("error", console.error);

  const bundlePath = path.resolve(outputDir, bundleName);
  const output = fs.createWriteStream(bundlePath);
  archive.pipe(output);
  output.on("close", function () {
    const kib = (archive.pointer() / 1048576).toPrecision(3);
    console.log(`[${bundleName}] Bundle: Success (${kib} MiB)`);
  });

  for (const folder of config.folders) {
    archive.directory(`./${folder}`, `ysdk/${folder}`);
  }

  for (const module of config.modules) {
    archive.directory(`./node_modules/${module}`, `ysdk/node_modules/${module}`);
  }

  for (const file of config.files) {
    archive.file(`./${file}`, { name: `ysdk/${file}` });
  }

  archive.finalize();
  archive;
}

//#endregion Cocos Store
