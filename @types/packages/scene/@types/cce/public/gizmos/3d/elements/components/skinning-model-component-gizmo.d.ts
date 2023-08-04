import Gizmo from '../gizmo-base';
declare class SkinningModelComponentGizmo extends Gizmo {
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
    onUpdate(): void;
}
export default SkinningModelComponentGizmo;
//# sourceMappingURL=skinning-model-component-gizmo.d.ts.map