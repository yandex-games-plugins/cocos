/// <reference types="node" />
import ControllerBase from "./controller-base";
import { Color, LightProbeGroup, Node, Vec3 } from "cc";
import PositionGizmo from "../transform/position-gizmo";
import { IControlMouseEvent } from "../../../defines";
import GizmoEventListener from "../listener/gizmo-event-listener";
import LightProbeEditModeListener from "../listener/light-probe-edit-mode-listener";
import GizmoOperationEventListener from "../listener/gizmo-operation-event-listener";
import { ISceneMouseEvent } from "../../../../../../private";
import SimpleSet from "../../../utils/set-util";
import type LightProbeGizmo from "../components/light/light-probe-gizmo";
export declare type NodeProbe = {
  node: Node;
  probe: Vec3;
};
export default class LightProbeController
  extends ControllerBase
  implements LightProbeEditModeListener, GizmoOperationEventListener
{
  targetDelegate: TargetDelegate<LightProbeGroup>;
  gizmo: LightProbeGizmo;
  static ProbeColor: Color;
  static SelectedProbeColor: Color;
  static WireFrameColor: Color;
  static ConvexColor: Readonly<Color>;
  static Count: number;
  static get Name(): string;
  protected _lockSize: boolean;
  private _isInitialized;
  private _probePool;
  private _currentProbes;
  private _currentSelectedProbeNames;
  private _probeSphere;
  private _reuseAbleMesh?;
  private _reuseAbleMaterial;
  private _shouldDiffOnNextUpdate;
  private _editMode;
  private _lightProbeInfo;
  static _gizmoEventListener: LightProbeGizmoMouseEventListener;
  static _gizmoEventListenerIndex: string;
  static globalNodeCurrentProbes: Map<string, NodeProbe>;
  static LightProbeSphereName: string;
  static TetrahedronNode: Node;
  static OuterCell: Node;
  static _positionNode: Node;
  static positionGizmo: PositionGizmo;
  get currentProbesArray(): {
    key: string;
    nodeProbe: NodeProbe;
  }[];
  get currentProbeNames(): Set<string>;
  get probeSphere(): Node;
  constructor(
    rootNode: Node,
    targetDelegate: TargetDelegate<LightProbeGroup>,
    gizmo: LightProbeGizmo
  );
  initShape(): void;
  tempAdjustSizeV3: Vec3;
  delta: number;
  adjustControllerSize(): void;
  static debounceUpdate: NodeJS.Timeout | null;
  updateController(): void;
  updateProbes(): void;
  updateLines(updateInfo?: boolean): void;
  updateWireframe(): Set<string>;
  updateConvex(indicesString?: Set<string>): number[];
  updateLightProbeInfo(): void;
  createProbeNode(probe: Vec3): Node;
  updateProbesColor(): void;
  updateLinesNode(
    node: Node,
    position: Vec3,
    vertices: Vec3[],
    indices: number[],
    color?: Color
  ): void;
  static TetrahedronLines: number[];
  static OuterCellLines: number[];
  releaseProbeNodes(nodeProbes: NodeProbe[]): void;
  updateNodeTransformInfo(node: Node): void;
  protected onShow(): void;
  protected onHide(): void;
  protected onMouseDown(event: IControlMouseEvent): void;
  protected onMouseMove(event: IControlMouseEvent): void;
  protected onMouseUp(event: IControlMouseEvent): void;
  get currentSelectedProbes(): NodeProbe[];
  protected changePositionTarget(target: Node[]): void;
  selectProbe(names: Iterable<string>): void;
  unselectProbe(names: Iterable<string>): void;
  private clearCurrentSelectedProbe;
  private updatePositionGizmo;
  lightProbeEditModeChanged(mode: boolean): void;
  boundingBoxEditModeChanged(mode: boolean): void;
  duplicateCurrentSelectedProbes(): SimpleSet<Node>;
  deleteCurrentSelectedProbes(): SimpleSet<Node>;
  clearLayer(node: Node, recursive?: boolean): void;
  restoreLayer(node: Node, recursive?: boolean): void;
  clearProbeNodesLayer(): void;
  restoreProbeNodesLayer(): void;
  diff(): NodeProbe[];
  onNotGizmoMouseDown(event: ISceneMouseEvent): void;
  onNotGizmoMouseMove(event: ISceneMouseEvent): void;
  onNotGizmoMouseUp(event: ISceneMouseEvent): void;
  shouldEmitNodes(): SimpleSet<string>;
  select(nodes: SimpleSet<Node>): void;
  selectAll(): void;
  unselect(nodes: SimpleSet<Node>): void;
  unselectAll(): void;
  currentSelectedNodes(): SimpleSet<Node>;
  lightProbeInfoChanged(): void;
  hideAllChildren(): void;
}
export interface TargetDelegate<T> {
  get target(): T;
}
declare class LightProbeGizmoMouseEventListener implements GizmoEventListener {
  controller: LightProbeController;
  constructor(controller: LightProbeController);
  onControllerMouseMove(event: IControlMouseEvent): void;
  onControllerMouseUp(event: IControlMouseEvent): void;
}
export {};
//# sourceMappingURL=light-probe-controller.d.ts.map
