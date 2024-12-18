export const PluginPackage = {
  package_version: 2,
  version: "2.1.0",
  name: "yandex-games-sdk",
  private: true,
  description: "i18n:yandex-games-sdk.description",
  main: "./workspaces/electron-main/dist/src/main.js",
  author: "LisGames",
  editor: ">=3.6.0",
  license: "MIT",
  packageManager: "npm@10.2.3",
  workspaces: ["workspaces/*"],
  scripts: {
    bundle: "node scripts/bundle.mjs",
    build: "turbo build",
    "build:watch": "turbo build:watch",
  },
  panels: {
    "localization-editor": {
      title: "Localization Editor",
      type: "dockable",
      main: "workspaces/electron-main/dist/src/panels/localization-editor",
      size: { "min-width": 400, "min-height": 300, width: 1024, height: 600 },
    },
  },
  contributions: {
    builder: "workspaces/electron-main/dist/src/builder/index.js",
    server: "workspaces/electron-main/dist/src/server.js",
    scene: { script: "workspaces/electron-main/dist/src/scene/index.js" },
    menu: [
      {
        path: "i18n:menu.extension/Yandex.Games",
        label: "i18n:yandex-games-sdk.localization-editor",
        message: "open-localization-editor",
      },
      {
        path: "i18n:menu.extension/Yandex.Games",
        label: "i18n:yandex-games-sdk.generate-templates",
        message: "generate-templates",
      },
      {
        path: "i18n:menu.extension/Yandex.Games",
        label: "i18n:yandex-games-sdk.check-templates",
        message: "check-templates",
      },
    ],
    messages: {
      "open-localization-editor": { methods: ["openLocalizationEditor"] },
      "generate-templates": { methods: ["generateTemplates"] },
      "check-templates": { methods: ["checkTemplates"] },
      "get-l10n-bundle": { methods: ["getL10NBundle"] },
    },
    "asset-db": {
      mount: {
        path: "./workspaces/static/assets",
        readonly: true,
        visible: "visibleL10nEditor",
        enable: "enableL10nEditor",
      },
    },
    profile: {
      project: { enableL10nEditor: { default: true }, visibleL10nEditor: { default: true } },
    },
  },
  dependencies: { "@cocos/creator-types": "^3.8.4", "@types/ysdk": "^1.0.7" },
  devDependencies: {
    "@biomejs/biome": "^1.9.2",
    archiver: "^6.0.1",
    turbo: "^2.1.2",
    typescript: "^5.0.4",
  },
} as const;
