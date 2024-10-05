import type {
  IBuildResult,
  IBuildTaskOption,
} from "@cocos/creator-types/editor/packages/builder/@types";
import type { BuilderAssetCache } from "@cocos/creator-types/editor/packages/builder/@types/protected";
import { ipc, logger } from "@yandex-games-sdk/common";
import type { JsonAsset } from "cc";

export const onBeforeBuildAssets = async function (
  options: IBuildTaskOption,
  result: IBuildResult,
  cache: BuilderAssetCache,
) {
  cache ??= (result as any).__task.cache;

  const translationsInfo = await Editor.Message.request(
    "asset-db",
    "query-asset-info",
    "db://yandex-games-sdk/l10n/translations.json",
  );
  if (!translationsInfo) {
    logger.error("l10n/translations.json query failed");
    return;
  }
  const translationsInstance = (await cache.getInstance(translationsInfo.uuid)) as JsonAsset;
  translationsInstance.json = await ipc.main.request("get-l10n-bundle");
  cache.addInstance(translationsInstance);
};
