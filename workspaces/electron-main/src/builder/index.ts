import type { BuildPlugin } from "@cocos/creator-types/editor/packages/builder/@types";

export type Options = {};

export const configs: BuildPlugin.Configs = {
  "*": {
    hooks: "./hooks",
  },
};
