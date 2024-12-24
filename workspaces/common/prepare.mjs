import { exec } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

import stringifyObject from "stringify-object";

writeFileSync(
  "./src/types/plugin.ts",
  `export const PluginPackage = ${stringifyObject(
    JSON.parse(
      readFileSync(new URL("../../package.json", import.meta.url), "utf-8"),
    ),
    {
      indent: "\t",
      inlineCharacterLimit: 80,
      singleQuotes: false,
    },
  )} as const;\n`,
);

exec("npx biome format ./src/types/plugin.ts --write");
