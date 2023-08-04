import {
  IAnimOperation,
  CreateNodeOptions,
  RemoveNodeOptions,
  SetPropertyOptions,
  RemoveArrayOptions,
  CreateComponentOptions,
  RemoveComponentOptions,
} from "../../../public";
import GeneralSceneFacade from "./general-scene-facade";
import { Node, Component } from "cc";
import { IAniResultBase, IChangeNodeOptions } from "../../../private";
declare class AnimationSceneFacade extends GeneralSceneFacade {
  init(): void;
  initEventListener(): void;
  enter(opts: any): Promise<void>;
  exit(): Promise<void>;
  openScene(uuid: string, clipUuid?: string): Promise<boolean>;
  closeScene(): Promise<boolean>;
  queryCurrentAnimationState(): any;
  queryCurrentAnimationInfo(): any;
  queryAnimationRootNode(uuid: string): string;
  queryAnimationRootInfo(uuid: string): any;
  queryAnimationClipDump(nodeUuid: string, clipUuid: string): any;
  queryAnimationProperties(uuid: string): any;
  queryAnimationClipsInfo(nodeUuid: string): any;
  queryAnimationClipCurrentTime(clipUuid: string): number;
  queryAnimationPropValueAtFrame(
    clipUuid: string,
    nodePath: string,
    propKey: string,
    frame: number
  ): any;
  recordAnimation(
    uuid: string,
    active: boolean,
    clipUuid?: string
  ): Promise<boolean>;
  changeAnimationRootNode(uuid: string, clipUuid: string): Promise<boolean>;
  setCurEditTime(time: number): Promise<boolean>;
  changeClipState(
    operate: "play" | "stop" | "resume" | "pause",
    clipUuid: string
  ): Promise<boolean>;
  setEditClip(clipUuid: string): Promise<boolean>;
  saveClip(): Promise<boolean>;
  applyAnimationOperation(
    operationList: IAnimOperation[]
  ): Promise<IAniResultBase>;
  queryAnimationNodeEditInfo(
    uuid: string
  ): import("../../../public").IAniEditInfo;
  createNode(options: CreateNodeOptions): Promise<void>;
  removeNode(options: RemoveNodeOptions): Promise<void>;
  setNodeProperty(options: SetPropertyOptions): Promise<boolean>;
  private isOperationOnAnimationClip;
  removeNodeArrayElement(options: RemoveArrayOptions): Promise<boolean>;
  onNodeChanged(node: Node, opts: IChangeNodeOptions): void;
  createComponent(options: CreateComponentOptions): Promise<void>;
  removeComponent(options: RemoveComponentOptions): Promise<void>;
  onComponentAdded(comp: Component): void;
  selectNode(uuid: string): void;
  queryCurrentSceneUuid(): string;
  previewMaterial(uuid: string, material: any): Promise<void>;
  querySceneDirty(): Promise<boolean>;
  saveScene(asNew: boolean): Promise<any>;
}
export default AnimationSceneFacade;
//# sourceMappingURL=animation-scene-facade.d.ts.map
