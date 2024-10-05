import type { PluginPackage } from "./plugin";

export type Contributions = (typeof PluginPackage)["contributions"];
export type Messages = Contributions["messages"];
