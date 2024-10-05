import { readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "src/index.ts",
    external: [...Object.keys(pkg.dependencies), ...builtinModules],
    output: [
      {
        format: "cjs",
        file: pkg.main,
        exports: "named",
        sourcemap: true,
      },
      {
        format: "es",
        file: pkg.module,
        plugins: [
          {
            name: "emit-module-package-file",
            generateBundle() {
              this.emitFile({
                type: "asset",
                fileName: "package.json",
                source: `{"type":"module"}`,
              });
            },
          },
        ],
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      file: pkg.types,
      format: "es",
    },
  },
];
