import { Camera, geometry, Node, Quat, renderer, Scene, Vec3 } from 'cc';
import { PreviewBase } from './preview-base';
/**
 * 可交互的Preview窗口基类，可以在窗口中方便的预览场景中的元素
 */
declare class InteractivePreview extends PreviewBase {
    protected scene: Scene;
    protected cameraComp: Camera;
    protected camera: renderer.scene.Camera | any;
    protected _isMouseDown: boolean;
    protected _viewDist: number;
    protected orbitRotateSpeed: number;
    protected _curCameraRot: Quat;
    protected _viewCenter: Vec3;
    createNodes(scene: Scene): void;
    init(registerName: string, queryName: string): void;
    protected autoPerfectCameraViewOnModel(model: Node): void;
    protected perfectCameraView(boundary: geometry.AABB | null | undefined): void;
    protected getFitDistance(boundary: geometry.AABB | null | undefined): number;
    onMouseDown(event: any): void;
    onMouseMove(event: any): void;
    onMouseUp(event: any): void;
    protected move(dx: number, dy: number): void;
    hide(): void;
}
export { InteractivePreview };
//# sourceMappingURL=Interactive-preview.d.ts.map