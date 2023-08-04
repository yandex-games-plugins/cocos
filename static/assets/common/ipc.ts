import { type JsonAsset } from "cc";
import { L10NBundle } from "./l10n";
import { PACKAGE_NAME } from "./constants";
import { LanguageCode } from "./localization";

/**
 *
 * Working with Editor.Message methods can be a pain in the ass,
 * so i made a little type-safe(ish) wrapper around all for better
 * developing experience.
 *
 * DISCLAIMER: You can use ipc ONLY in editor!
 *
 * @author koteelok
 *
 */

//#region Main process

const MainMethodsNames = {
  "open-localization-editor": "openLocalizationEditor",
  "check-templates": "checkTemplates",
  "generate-templates": "generateTemplates",
  "get-l10n-bundle": "getL10NBundle",
} as const;

export type MainMethods = {
  openLocalizationEditor(): void;
  generateTemplates(): void;
  checkTemplates(): void;
  getL10NBundle(): L10NBundle;
};

export type MainBroadcasts = {
  "yandex-games-sdk:localization-reload": () => void;
};

function mainRequest<T extends keyof typeof MainMethodsNames>(name: T) {
  return Editor.Message.request(PACKAGE_NAME, name) as Promise<
    ReturnType<MainMethods[(typeof MainMethodsNames)[T]]>
  >;
}

function mainON<T extends keyof MainBroadcasts>(
  message: T,
  callback: MainBroadcasts[T]
) {
  Editor.Message.addBroadcastListener(message, callback);
}

function mainOFF(message: keyof MainBroadcasts, callback: Function) {
  Editor.Message.removeBroadcastListener(message, callback);
}

function mainBroadcast<T extends keyof MainBroadcasts>(
  message: T,
  ...args: Parameters<MainBroadcasts[T]>
) {
  Editor.Message.broadcast(message, ...args);
}

//#endregion

//#region Scene process

export type SceneMethods = {
  reload(): Promise<void>;
  changeLanguage(code: LanguageCode): Promise<void>;
  getLanguage(): Promise<LanguageCode>;
};

function sceneRequest<T extends keyof SceneMethods>(
  method: T,
  ...args: Parameters<SceneMethods[T]>
) {
  return Editor.Message.request("scene", "execute-scene-script", {
    name: PACKAGE_NAME,
    method,
    args,
  }) as Promise<ReturnType<SceneMethods[T]>>;
}

//#endregion

export const ipc = {
  main: {
    request: mainRequest,
    on: mainON,
    off: mainOFF,
    broadcast: mainBroadcast,
  },
  scene: {
    request: sceneRequest,
    softReload: () => {
      Editor.Message.send("scene", "soft-reload");
    },
  },
};
