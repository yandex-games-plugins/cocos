const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const package = require("../package.json");

const config = {
  folders: ["@cc", "@types", "dist", "docs", "i18n", "static"],
  modules: ["@babel", "i18next", "regenerator-runtime", "@types/ysdk"],
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

// create directory ../bundles if not exists
if (!fs.existsSync(path.resolve(__dirname, "../bundles"))) {
  fs.mkdirSync(path.resolve(__dirname, "../bundles"));
}

function githubBundle() {
  const bundleName = `ysdk-cc-${package.version}.zip`;

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.on("warning", console.warn);
  archive.on("error", console.error);

  const bundlePath = path.resolve(__dirname, `../bundles/${bundleName}`);
  const output = fs.createWriteStream(bundlePath);
  archive.pipe(output);
  output.on("close", function () {
    const kib = (archive.pointer() / 1048576).toPrecision(3);
    console.log(`[${bundleName}] Bundle: Success (${kib} MiB)`);
  });

  for (const folder of config.folders) {
    archive.directory("./" + folder, folder);
  }

  for (const module of config.modules) {
    archive.directory("./node_modules/" + module, "./node_modules/" + module);
  }
  for (const file of config.files) {
    archive.file("./" + file, { name: file });
  }

  archive.finalize();
}

function storeBundle() {
  const bundleName = `ysdk.zip`;

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.on("warning", console.warn);
  archive.on("error", console.error);

  const bundlePath = path.resolve(__dirname, `../bundles/${bundleName}`);
  const output = fs.createWriteStream(bundlePath);
  archive.pipe(output);
  output.on("close", function () {
    const kib = (archive.pointer() / 1048576).toPrecision(3);
    console.log(`[${bundleName}] Bundle: Success (${kib} MiB)`);
  });

  for (const folder of config.folders) {
    archive.directory("./" + folder, "ysdk/" + folder);
  }

  for (const module of config.modules) {
    archive.directory(
      "./node_modules/" + module,
      "ysdk/node_modules/" + module
    );
  }
  for (const file of config.files) {
    archive.file("./" + file, { name: "ysdk/" + file });
  }

  archive.finalize();
}

githubBundle();
storeBundle();
