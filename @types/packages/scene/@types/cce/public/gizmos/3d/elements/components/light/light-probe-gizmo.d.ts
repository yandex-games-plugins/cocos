/// <reference types="node" />
import GizmoBase from "../../gizmo-base";
import LightProbeController, {
  TargetDelegate,
} from "../../controller/light-probe-controller";
import { LightProbeGroup, Node } from "cc";
import GizmoOperationEventListener from "../../listener/gizmo-operation-event-listener";
import LightProbeEditModeListener from "../../listener/light-probe-edit-mode-listener";
import {
  IChangeNodeOptions,
  ISceneMouseEvent,
} from "../../../../../../../private";
import "../../../../utils/set-util";
import LightProbeBoundingBoxController from "../../controller/light-probe-bounding-box-controller";
import { IControlMouseEvent } from "../../../../defines";
import SimpleSet from "../../../../utils/set-util";
export default class LightProbeGizmo
  extends GizmoBase
  implements
    TargetDelegate<LightProbeGroup>,
    LightProbeEditModeListener,
    GizmoOperationEventListener
{
  shouldRegisterGizmoOperationEvent: boolean;
  _controller: LightProbeController;
  _originTarget?: LightProbeGroup;
  _boundingBoxController: LightProbeBoundingBoxController;
  _minPosPath: string | null;
  _maxPosPath: string | null;
  _lightProbeRoot?: Node;
  _boundingBoxRoot?: Node;
  set target(value: LightProbeGroup);
  get target(): LightProbeGroup;
  _isInited: boolean;
  protected init(): void;
  createController(gizmoRoot: Node): void;
  protected onShow(): void;
  protected onHide(): void;
  onNodeChanged(event: IChangeNodeOptions): void;
  private checkIconGizmoStats;
  static debounceUpdateController: NodeJS.Timeout | null;
  static debounceUpdateLines: NodeJS.Timeout | null;
  private afterPositionGizmoSetPositions;
  _checkShouldSkipUpdateLightProbeController(
    event?: IChangeNodeOptions
  ): boolean;
  protected onTargetUpdate(): void;
  onBBControllerMouseDown(event: IControlMouseEvent): void;
  onBBControllerMouseMove(event: IControlMouseEvent): void;
  onBBControllerMouseUp(event: IControlMouseEvent): void;
  updateNodeTransformInfo(node: Node): void;
  get currentTransformTool(): any;
  updateCurrentTransformToolVisible(mode: boolean): void;
  lightProbeEditModeChanged(mode: boolean): void;
  lightProbeInfoChanged(): void;
  boundingBoxEditModeChanged(mode: boolean): void;
  checkCurrentTargetPointingSelf(): boolean;
  duplicateCurrentSelectedProbes(): SimpleSet<Node>;
  deleteCurrentSelectedProbes(): SimpleSet<Node>;
  select(nodes: SimpleSet<Node>): void;
  selectAll(): void;
  unselect(nodes: SimpleSet<Node>): void;
  unselectAll(): void;
  onNotGizmoMouseDown(event: ISceneMouseEvent): void;
  onNotGizmoMouseMove(event: ISceneMouseEvent): void;
  onNotGizmoMouseUp(event: ISceneMouseEvent): void;
  shouldEmitNodes(): SimpleSet<string>;
  currentSelectedNodes(): SimpleSet<Node>;
}
//# sourceMappingURL=light-probe-gizmo.d.ts.map
