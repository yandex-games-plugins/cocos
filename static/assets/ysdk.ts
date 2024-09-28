import type { SDK } from "ysdk";
import { game, cclegacy } from "cc";
import { EDITOR } from "cc/env";
import { L10NManager } from "./core/l10n";

export let ysdk = {} as SDK;

export const l10n = L10NManager.instance;

if (cclegacy.GAME_VIEW || EDITOR) {
  // We can use top-level await in editor
  // @ts-ignore
  await l10n["init"]();
} else {
  // for Runtime or Preview
  game.onPostProjectInitDelegate.add(async () => {
    ysdk = await YaGames.init();
    await l10n["init"]();
    l10n.changeLanguage(ysdk.environment.i18n.lang);
  });
}

export * from "./common";
