import { type L10NBundle, ipc, logger, plugin } from "@yandex-games-sdk/common";
import { type AssetManager, assetManager } from "cc";
import type { JsonAsset } from "cc";
// @ts-ignore
import { BUILD, EDITOR } from "cc/env";

export function fetchL10NBundle(): Promise<L10NBundle> {
  if (EDITOR) {
    return ipc.main.request("get-l10n-bundle");
  }

  if (BUILD) {
    return runtimeLoad(plugin.l10nBundle.path);
  }

  return previewLoad(plugin.l10nBundle.path);
}

async function runtimeLoad(path: string) {
  return new Promise<L10NBundle>((resolve, reject) => {
    assetManager.loadBundle(plugin.l10nBundle.name, (error, bundle: AssetManager.Bundle) => {
      if (error) {
        logger.error(`Can't load ${plugin.l10nBundle.name} from AssetManager`);
        reject(error);
      }

      bundle.load<JsonAsset>(path, (error, asset) => {
        if (error) {
          logger.error(`Can't load ${path} in runtime`);
          reject(error);
        }

        resolve(asset.json as L10NBundle);
      });
    });
  });
}

function previewLoad(path: string) {
  return fetch(`${plugin.name}/${path}`).then((r) => r.json());
}
