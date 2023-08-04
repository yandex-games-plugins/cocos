const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: "production",
});
