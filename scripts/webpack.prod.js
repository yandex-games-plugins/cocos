const { merge } = require("webpack-merge");
const base = require("./webpack.electron-main.js");

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: "production",
});
