import EditableController from './editable-controller';
import { IControlMouseEvent } from '../../../defines';
import { Node, Vec3, MeshRenderer, Color } from 'cc';
declare class SphereController extends EditableController {
    private _center;
    private _radius;
    private _deltaRadius;
    private _circleDataMap;
    private _mouseDeltaPos;
    private _curDistScalar;
    private _controlDir;
    constructor(rootNode: Node);
    get radius(): number;
    set radius(value: number);
    setColor(color: Color): void;
    createCircleByAxis(axisName: string, fromAxisName: string, color: Color): void;
    _updateEditHandle(axisName: string): void;
    initShape(): void;
    updateSize(center: Vec3, radius: number): void;
    updateArcMesh(model: MeshRenderer, center: Vec3, normal: Vec3, from: Vec3, radian: number, radius: number): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onMouseLeave(event: IControlMouseEvent): void;
    getDeltaRadius(): number;
    getControlDir(): Vec3;
}
export default SphereController;
//# sourceMappingURL=hemisphere-controller.d.ts.map