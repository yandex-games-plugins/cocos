import { plugin } from "../constants";
import type { L10NBundle } from "../l10n";
import type { Messages } from "../types";

type MethodMap = { [key in keyof Messages]: Messages[key]["methods"][0] };
type Methods<T extends { [key in MethodMap[keyof MethodMap]]: (...args: any[]) => any }> = T;

export type MainMethods = Methods<{
  openLocalizationEditor(): void;
  generateTemplates(): void;
  checkTemplates(): void;
  getL10NBundle(): L10NBundle;
}>;

export default {
  request<T extends keyof MethodMap>(name: T) {
    return Editor.Message.request(plugin.name, name) as Promise<
      ReturnType<MainMethods[MethodMap[T]]>
    >;
  },
};
