import { BuildPlugin } from "../../../@types";

export interface Options {}

export const configs: BuildPlugin.Configs = {
  "web-mobile": {
    hooks: "./web-hooks",
    options: {},
    verifyRuleMap: {},
  },
  "web-desktop": {
    hooks: "./web-hooks",
    options: {},
    verifyRuleMap: {},
  },
};

export const assetHandlers: BuildPlugin.AssetHandlers = "./asset-handlers";
