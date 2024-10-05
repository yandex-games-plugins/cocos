import { PluginPackage } from "./types/plugin";

export const plugin = {
  name: PluginPackage.name,

  l10nBundle: {
    name: "ysdk-i18n-bundle",
    path: "translations",
  },
} as const;
