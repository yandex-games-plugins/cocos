import { BUILD, EDITOR } from "cc/env";
import { AssetManager, assetManager, JsonAsset } from "cc";
import { L10NBundle, L10N_BUNDLE, PACKAGE_NAME, ipc } from "../common";
import { Asset } from "cc";

export class L10NBundleManager {
  public async load(): Promise<L10NBundle> {
    if (EDITOR) {
      return ipc.main.request("get-l10n-bundle");
    } else if (BUILD) {
      return this.runtimeLoad(L10N_BUNDLE.BUNDLE_PATH);
    } else {
      return this.previewLoad(L10N_BUNDLE.BUNDLE_PATH);
    }
  }

  private async runtimeLoad<T>(fileName: string): Promise<T> {
    const bundle = await this.loadBundleAsync(L10N_BUNDLE.NAME);
    const jsonAsset = await this.loadBundleFileAsync<JsonAsset>(
      bundle,
      fileName
    );
    if (!jsonAsset) throw new Error(`Can't load ${fileName} in runtime`);
    return jsonAsset.json as any as T;
  }

  private async previewLoad<T>(urlPath: string): Promise<T> {
    try {
      return (await fetch(`${PACKAGE_NAME}/${urlPath}`)).json() as T;
    } catch (e) {
      throw new Error("Can't load bundle in preview");
    }
  }

  private async loadBundleAsync(
    bundleName: string
  ): Promise<AssetManager.Bundle> {
    return new Promise((resolve) => {
      assetManager.loadBundle(
        bundleName,
        (error, bundle: AssetManager.Bundle) => {
          if (error) {
            throw new Error(`Can't load ${bundleName} from AssetManager`);
          } else {
            resolve(bundle);
          }
        }
      );
    });
  }

  private async loadBundleFileAsync<T extends Asset>(
    bundle: AssetManager.Bundle,
    resourceName: string
  ): Promise<T | undefined> {
    return new Promise((resolve) => {
      bundle.load<T>(resourceName, (error, asset) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(asset);
        }
      });
    });
  }
}
