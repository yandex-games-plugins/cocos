import { IChangeNodeOptions, IOptionBase } from "../../../private";
import { Node, Component } from "cc";
interface ISceneEvents {
  onResize?(opts: any): void;
  onSceneOpened?(scene: any): void;
  onSceneReload?(scene: any): void;
  onSceneClosed?(scene: any): void;
  onNodeChanged?(node: Node, opts: IChangeNodeOptions): void;
  onAddNode?(node: Node): void;
  onRemoveNode?(node: Node): void;
  onNodeAdded?(node: Node, opts: IOptionBase): void;
  onNodeRemoved?(node: Node, opts: IOptionBase): void;
  onAddComponent?(comp: Component): void;
  onRemoveComponent?(comp: Component): void;
  onComponentAdded?(comp: Component, opts?: IOptionBase): void;
  onComponentRemoved?(comp: Component, opts?: IOptionBase): void;
  onAssetDeleted?(uuid: string, info?: any): void;
  onAssetChanged?(uuid: string, info?: any, meta?: any): void;
}
export { ISceneEvents };
//# sourceMappingURL=scene-events-interface.d.ts.map
