module.exports = {
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
};
