import { MeshRenderer } from 'cc';
import Gizmo from '../gizmo-base';
import { TargetDelegate } from '../controller/light-probe-controller';
declare class ModelComponentGizmo extends Gizmo implements TargetDelegate<MeshRenderer> {
    private _controller;
    private _tetrahedronController;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    updateControllerTransform(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default ModelComponentGizmo;
//# sourceMappingURL=model-component-gizmo.d.ts.map