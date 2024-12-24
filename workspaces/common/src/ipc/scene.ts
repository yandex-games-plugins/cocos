import type { ISO_639_1 } from "ysdk";

import { plugin } from "../constants";

export type SceneMethods = {
  reload(): Promise<void>;
  changeLanguage(code: ISO_639_1): Promise<void>;
  getLanguage(): Promise<ISO_639_1>;
};

export default {
  request<T extends keyof SceneMethods>(
    method: T,
    ...args: Parameters<SceneMethods[T]>
  ) {
    return Editor.Message.request("scene", "execute-scene-script", {
      name: plugin.name,
      method,
      args,
    }) as Promise<ReturnType<SceneMethods[T]>>;
  },

  softReload() {
    Editor.Message.send("scene", "soft-reload");
  },
};
