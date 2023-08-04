import { BuildHook } from "../../../@types";
import { type JsonAsset } from "cc";
import { ipc, L10N_BUNDLE } from "@common";

export const load: BuildHook.load = async function () {};

export const unload: BuildHook.unload = async function () {};

export const throwError: BuildHook.throwError = true;

export const onError: BuildHook.onError = async function (options, result) {};

export const onBeforeBuildAssets: BuildHook.onBeforeBuild = async function (
  options,
  result
) {
  const buildTask = (result as any).__task;
  const internalResult = buildTask.result;
  const i18nBundle = internalResult.bundleMap[L10N_BUNDLE.NAME];

  const translationsAssetUUID = "af6fd40f-7956-40de-997a-1f6a873ff430";
  const translationsAsset = (await i18nBundle.cache.getInstance(
    translationsAssetUUID
  )) as JsonAsset;
  translationsAsset.json = await ipc.main.request("get-l10n-bundle");
  i18nBundle.cache.addInstance(translationsAsset);

  /**
   * Code below adds all translations json files to bundle.
   * It works, but might be unstable, so i considered using bundle file.
   *
   * The problem with bundle file is that there sometimes just too
   * much translations to be handled in one file (big file size or whatever).
   */
  // translationFiles
  //   .map((fileName) => {
  //     // @ts-ignore
  //     const asset = new cc.JsonAsset(fileName.slice(0, -5)) as JsonAsset;
  //     asset.json = JSON.parse(
  //       fs.readFileSync(join(translateDataRoot, fileName), "utf-8")
  //     );
  //     asset._uuid = uuidV4();
  //     return asset;
  //   })
  //   .forEach((asset) => {
  //     i18nBundle._assets.add(asset.uuid);
  //     const assetInfo = {
  //       displayName: asset.name + ".json",
  //       file: "",
  //       imported: true,
  //       importer: "json",
  //       instantiation: undefined,
  //       invalid: false,
  //       isDirectory: false,
  //       name: "",
  //       type: "cc.JsonAsset",
  //       readonly: true,
  //       uuid: asset.uuid,
  //       visible: true,
  //       extends: undefined,
  //       library: {
  //         ".json": "",
  //       },
  //       path: "",
  //       redirect: undefined,
  //       source: "",
  //       subAssets: {},
  //       url: "",
  //     };
  //     i18nBundle.cache.addAsset(assetInfo);
  //     i18nBundle.cache.__library.asset[asset.uuid] = assetInfo;
  //     i18nBundle.cache.addInstance(asset);
  //   });
};
