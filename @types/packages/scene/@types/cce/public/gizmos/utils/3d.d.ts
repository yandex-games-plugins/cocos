/// <reference path="../../../../../../../../resources/3d/engine/bin/.declarations/cc.d.ts" />
/// <reference path="engine/3d.d.ts" />
/// <reference path="../3d/gizmo-manager.ts" />
/// <reference types="cc" />
import UtilsInterface from "./utils-interface";
export declare class Utils3D extends UtilsInterface {
  constructor();
  requestPointerLock(): void;
  exitPointerLock(): void;
  emitNodeMessage(message: string, ...params: any[]): void;
  broadcastMessage(message: string, ...params: any[]): void;
  onNodeChanged(node: any, ...param: any[]): void;
  getGizmoRoot(): import("cc").Node | null;
  repaintEngine(): void;
  recordChanges(nodes: any[]): void;
  commitChanges(nodes: any[]): void;
  select(uuid: string): void;
  changePointer(type: string): void;
}
declare const _default: Utils3D;
export default _default;
//# sourceMappingURL=3d.d.ts.map
