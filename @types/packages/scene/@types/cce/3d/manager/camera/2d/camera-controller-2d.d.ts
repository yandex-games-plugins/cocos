import { ISceneKeyboardEvent, ISceneMouseEvent } from "../../../../../private";
import CameraControllerBase from "../camera-controller-base";
import Grid from "../grid";
import { Camera, Vec3, Size, Color, Quat } from "cc";
declare class CameraController2D extends CameraControllerBase {
  private _modeFSM;
  private _idleMode;
  private _panMode;
  private _lineColor;
  private _grid;
  private _ruler;
  isMoving(): boolean;
  protected _wheelSpeed: number;
  protected _near: number;
  protected _far: number;
  get lineColor(): Color;
  set lineColor(value: Color);
  get grid(): Grid;
  init(camera: Camera): void;
  private _initMode;
  _initRuler(): void;
  updateRuler(): void;
  _initGrid(): void;
  updateGrid(): void;
  set active(value: boolean);
  _adjustToCenter(
    margin: number,
    contentBounds?: Size | null,
    immediate?: boolean
  ): void;
  adjustCamera(immediate?: boolean): void;
  _updateGridData(
    positions: number[],
    colors: number[],
    lineColor: Color,
    lineEnd: number
  ): void;
  _updateOrthoHeight(scale: number): void;
  focus(
    nodeUuids: string[] | null,
    position?: Vec3,
    rotation?: Quat,
    viewCenter?: Vec3,
    immediate?: boolean
  ): void;
  smoothScale(curScale: number, delta: number): number;
  /**
   * @method fitSize
   * @param {number} srcWidth
   * @param {number} srcHeight
   * @param {number} destWidth
   * @param {number} destHeight
   * @return {number[]} - [width, height]
   */
  fitSize(
    srcWidth: number,
    srcHeight: number,
    destWidth: number,
    destHeight: number
  ): number[];
  getSizeScale(
    newWidth: number,
    newHeight: number,
    oldWidth: number,
    oldHeight: number
  ): number;
  scale(delta: number, offsetX: number, offsetY: number): void;
  onMouseDown(event: ISceneMouseEvent): boolean;
  onMouseMove(event: ISceneMouseEvent): boolean;
  onMouseUp(event: ISceneMouseEvent): boolean;
  onMouseWheel(event: any): void;
  onKeyDown(event: ISceneKeyboardEvent): void;
  onKeyUp(event: ISceneKeyboardEvent): void;
  onUpdate(deltaTime: number): void;
  onDesignResolutionChange(): void;
  onResize(): void;
  refresh(): void;
  zoomTo(scale: number, x?: number, y?: number): void;
  zoomUp(): void;
  zoomDown(): void;
  zoomReset(): void;
}
export { CameraController2D };
//# sourceMappingURL=camera-controller-2d.d.ts.map
