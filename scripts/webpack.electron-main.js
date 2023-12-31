const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const entryFiles = [
  "./src/main.ts",
  "./src/scene/index.ts",
  "./src/server.ts",
  "./src/panels/localization-editor/index.ts",
  "./src/builder/index.ts",
  "./src/builder/asset-handlers.ts",
  "./src/builder/web-hooks.ts",
].reduce((obj, el) => {
  el = el.replaceAll("\\", "/");
  obj[el.replace(".ts", "")] = "./" + el;
  return obj;
}, {});

const optionalPlugins = [];
if (process.platform !== "darwin") {
  optionalPlugins.push(
    new webpack.IgnorePlugin({ resourceRegExp: /^fsevents$/ })
  );
}

/** @type {import('webpack').Configuration} */
module.exports = {
  target: "electron-main",
  devtool: "source-map",
  entry: {
    ...entryFiles,
  },
  context: path.resolve(__dirname, "../electron-main/"),
  resolve: {
    alias: {
      "@common": path.join(__dirname, "../static/assets/common"),
    },
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
      {
        test: /\.html$/,
        loader: "raw-loader",
      },
      {
        test: /.node$/,
        loader: "node-loader",
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
            if (name) return "modules/" + name + "/" + module.buildInfo.hash;
          },
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist/electron-main"),
    libraryTarget: "umd",
  },
  externalsPresets: {
    node: true,
  },
  plugins: [
    ...optionalPlugins,
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "../electron-main/tsconfig.json"),
      },
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
