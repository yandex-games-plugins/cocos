import { Node } from "cc";
import {
  IChangeNodeOptions,
  ISceneKeyboardEvent,
} from "../../../../../private";
declare class GizmoBase {
  protected _hovering: boolean;
  protected _selecting: boolean;
  protected _editing: boolean;
  protected _isInited: boolean;
  protected _hidden: boolean;
  protected _target: any;
  protected _rootNode: any;
  protected _isControlBegin: boolean;
  protected _recorded: boolean;
  protected onTargetUpdate?(): void;
  protected init?(): void;
  protected onShow?(): void;
  protected onHide?(): void;
  onUpdate?(deltaTime: number): void;
  onDestroy?(): void;
  onNodeChanged?(event: IChangeNodeOptions): void;
  onKeyDown?(event: ISceneKeyboardEvent): void;
  onKeyUp?(event: ISceneKeyboardEvent): void;
  onCameraControlModeChanged?(mode: number): void;
  shouldRegisterGizmoOperationEvent: boolean;
  isNodeLocked(node: Node): boolean;
  constructor(target: any);
  get target(): any;
  get hidden(): boolean;
  set target(value: any);
  layer(): string;
  getGizmoRoot(): any;
  onControlBegin(propPath: string | null): void;
  onControlUpdate(propPath: string | null): void;
  onControlEnd(propPath: string | null): void;
  recordChanges(): void;
  commitChanges(): void;
  _checkLockStatus(): number;
  targetValid(): any;
  visible(): boolean;
  hide(): void;
  destroy(): void;
  show(): void;
  update(deltaTime: number): void;
  get node(): any;
  get nodes(): any[];
  get topNodes(): Node[];
  get selecting(): boolean;
  set selecting(value: boolean);
  get editing(): boolean;
  set editing(value: boolean);
  get hovering(): boolean;
  set hovering(value: boolean);
  getCompPropPath(propName: string): string | null;
  protected onComponentChanged(node: Node): void;
  onEditorCameraMoved(): void;
  registerCameraMovedEvent(): void;
  unregisterCameraMoveEvent(): void;
}
export default GizmoBase;
//# sourceMappingURL=gizmo-base.d.ts.map
