const webpack = require("webpack");
const path = require("node:path");

const entryFiles = [
  "./src/main.ts",
  "./src/scene/index.ts",
  "./src/server.ts",
  "./src/panels/localization-editor/index.ts",
  "./src/builder/index.ts",
  "./src/builder/hooks.ts",
].reduce((obj, el) => {
  obj[el.replace(".ts", "")] = `./${el}`;
  return obj;
}, {});

module.exports = (env) => {
  /** @type {webpack.Configuration} */
  const config = {
    target: "electron-main",
    entry: {
      ...entryFiles,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".html", ".css", ".sass", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // .ts, .tsx
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
              plugins: [
                [
                  "@vue/babel-plugin-jsx",
                  {
                    isCustomElement: (tag) => tag.includes("ui-"),
                  },
                ],
                "@babel/plugin-transform-modules-commonjs",
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]|c)ss$/, // .css, .sass, .scss
          use: ["raw-loader", "sass-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          include: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
            name(module) {
              const name = module.resourceResolveData.descriptionFileData?.name;
              if (name) return `modules/${name}/${module.buildInfo.hash}`;
            },
          },
        },
      },
    },
    output: {
      path: path.resolve("dist"),
      libraryTarget: "umd",
    },
    externalsPresets: {
      node: true,
      electronMain: true,
    },
    externals: ["electron", "@yandex-games-sdk/common"],
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
    ],
  };

  if (env.development) {
    config.mode = "development";
    config.devtool = "source-map";
    config.watch = true;
  }

  if (env.production) {
    config.mode = "production";
    config.devtool = "source-map";
  }

  if (process.platform !== "darwin") {
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
  }

  return config;
};
