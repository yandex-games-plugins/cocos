import { Node, Vec3, Vec2, Color } from "cc";
import TransformGizmo from "./transform-gizmo";
import {
  RectangleController,
  RectHandleType as HandleType,
} from "../controller/rectangle-controller";
import { SnapGuidelineGroup } from "../../../utils/rect-transform-snapping";
import LinesController from "../controller/lines-controller";
import { ISceneKeyboardEvent } from "../../../../../../private";
declare class RectGizmo extends TransformGizmo {
  protected _controller: RectangleController;
  private _worldPosList;
  private _localPosList;
  private _sizeList;
  private _anchorList;
  private _rectList;
  private _validTarget;
  private _tempRect;
  private _editRect;
  private _altKey;
  private _snapDistVec2;
  private _nodeSnapLinesCtrl;
  private _canvasSnapLinesCtrl;
  private _equalSpacingLinesCtrl;
  private _shiftKey;
  init(): void;
  layer(): string;
  isNodeAnchorLocked(node: Node): boolean;
  isNodeContentSizeLocked(node: Node): boolean;
  createController(): void;
  onControllerMouseDown(): void;
  onControllerMouseMove(): void;
  onControllerMouseUp(): void;
  onGizmoKeyDown(event: ISceneKeyboardEvent): boolean;
  onGizmoKeyUp(event: ISceneKeyboardEvent): boolean;
  handleAreaMove(delta: Vec3): void;
  handleAnchorMove(delta: Vec3): void;
  getSizePoint(type: HandleType): any;
  modifyPosDeltaWithAnchor(
    type: any,
    posDelta: Vec3,
    sizeDelta: Vec2,
    anchor: Vec2,
    keepCenter: boolean
  ): void;
  formatSizeDelta(type: HandleType, sizeDelta: Vec2): void;
  handleOneTargetSize(
    type: HandleType,
    delta: Vec3,
    keepCenter: boolean,
    keepScale: boolean
  ): void;
  handleMultiTargetSize(
    type: HandleType,
    delta: Vec3,
    keepCenter: boolean
  ): void;
  getBounds(flipX: boolean, flipY: boolean, nodes: Node[]): Vec2[];
  updateDataFromController(): void;
  updateControllerTransform(): void;
  updateControllerData(): void;
  drawNodeGuidelineGroup(guidelineGroup: SnapGuidelineGroup): void;
  drawNodeSnappingGuideline(): void;
  clearNodeSnappingGuideline(): void;
  getDrawLineVertices(guidelineGroup: SnapGuidelineGroup): Vec3[] | null;
  drawGuidelineGroup(
    guidelineGroup: SnapGuidelineGroup,
    linesCtrl: LinesController,
    color?: Readonly<Color>
  ): void;
  drawGuidelines(
    linesCtrl: LinesController,
    drawLineVertices: Vec3[],
    color?: Readonly<Color>
  ): void;
  drawCanvasSnappingGuideline(): void;
  clearCanvasSnappingGuideline(): void;
  drawEqualSpacingGuideline(): void;
  clearEqualSpacingGuideline(): void;
}
export default RectGizmo;
//# sourceMappingURL=rect-gizmo.d.ts.map
