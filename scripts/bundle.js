const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const package = require("../package.json");

const bundleName = `ysdk-cc-${package.version}.zip`;
const bundlePath = path.resolve(__dirname, `../bundles/${bundleName}`);
const output = fs.createWriteStream(bundlePath);

// create directory ../bundles if not exists
if (!fs.existsSync(path.resolve(__dirname, "../bundles"))) {
  fs.mkdirSync(path.resolve(__dirname, "../bundles"));
}

const archive = archiver("zip", {
  zlib: { level: 9 },
});

output.on("close", function () {
  const kib = (archive.pointer() / 1048576).toPrecision(3);
  console.log(`[${bundleName}] Bundle: Success (${kib} MiB)`);
});

archive.on("warning", console.warn);
archive.on("error", console.error);

archive.pipe(output);

const folders = ["@cc", "@types", "dist", "docs", "i18n", "static"];

folders.forEach((folder) => {
  archive.directory("./" + folder, folder);
});

const modules = ["i18next"];

for (const module of modules) {
  archive.directory(`./node_modules/${module}`, `node_modules/${module}`);
}

const files = [
  "AUTHORS",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "package.json",
  "README_ZH.md",
  "README.md",
];

files.forEach((file) => {
  archive.file("./" + file, { name: file });
});

archive.finalize();
