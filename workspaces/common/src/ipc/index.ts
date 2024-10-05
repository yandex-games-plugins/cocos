import electronMain, { type MainMethods } from "./electron-main";
import scene, { type SceneMethods } from "./scene";

export type { MainMethods, SceneMethods };

export const ipc = {
  main: electronMain,
  scene,
};
