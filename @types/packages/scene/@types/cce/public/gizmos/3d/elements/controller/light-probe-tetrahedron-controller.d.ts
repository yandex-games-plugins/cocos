import ControllerBase from './controller-base';
import { Color, MeshRenderer, Node } from 'cc';
import { TargetDelegate } from './light-probe-controller';
export default class LightProbeTetrahedronController extends ControllerBase {
    targetDelegate: TargetDelegate<MeshRenderer>;
    static Count: number;
    static get Name(): string;
    static ProbeColor: Color;
    static LineColor: Color;
    protected _lockSize: boolean;
    private _isInitialized;
    private _probeSphere;
    private _innerTetrahedron;
    private _probeSphereNodes;
    private _currentTetrahedronIndex;
    constructor(rootNode: Node, targetDelegate: TargetDelegate<MeshRenderer>);
    initShape(): void;
    private initProbeSphere;
    show(): void;
    updateController(): void;
    updateInnerTetrahedron(tetrahedronIndex: number): void;
    clearLayer(node: Node): void;
    getProbesData(): void;
    getTetrahedronIndex(): number;
    adjustControllerSize(): void;
}
//# sourceMappingURL=light-probe-tetrahedron-controller.d.ts.map