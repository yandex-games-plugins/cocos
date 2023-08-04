declare module 'cc' {
    interface Node {
        modelComp?: ModelComponent;
        modelColor?: Color;
    }
}
import { Camera, Color, Component, geometry, gfx, IVec3Like, Light, math, MeshRenderer, ModelComponent, Node, primitives, Material, Mesh, Layers } from 'cc';
import { IAddMeshToNodeOption, ICreateMeshOption, IMeshPrimitive, DynamicMeshPrimitive } from '../../defines';
import EngineInterface from './engine-interface';
export declare class Engine3D implements EngineInterface {
    static instance: Engine3D;
    static createInstance(): Engine3D;
    readonly panPlaneLayer: Readonly<Layers.Enum>;
    readonly CullMode: Readonly<typeof gfx.CullMode>;
    readonly AttributeName: Readonly<typeof gfx.AttributeName>;
    readonly PrimitiveMode: Readonly<typeof gfx.PrimitiveMode>;
    readonly LightType: Readonly<typeof Light.Type>;
    readonly ProjectionType: Readonly<typeof Camera.ProjectionType>;
    readonly FOVAxis: Readonly<typeof Camera.FOVAxis>;
    protected constructor();
    create3DNode(name?: string): Node;
    createMesh(primitive: IMeshPrimitive, opts?: ICreateMeshOption): any;
    transformToDynamicGeometry(primitive: IMeshPrimitive): primitives.IDynamicGeometry;
    createDynamicMesh(primitive: DynamicMeshPrimitive, opts: (primitives.ICreateDynamicMeshOptions & ICreateMeshOption)): Mesh;
    updateDynamicMesh(meshRenderer: MeshRenderer, subIndex: number, primitive: DynamicMeshPrimitive): void;
    addMeshToNode(node: Node, mesh: any, opts?: IAddMeshToNodeOption, reuseMaterial?: Material): void;
    setMeshColor(node: Node, c: Color): void;
    getMeshColor(node: Node): Color | undefined;
    setNodeOpacity(node: Node, opacity: number): void;
    getNodeOpacity(node: Node): number;
    setMaterialProperty(node: Node, propName: string, value: any): void;
    getRaycastResults(rootNode: Node, x: number, y: number, distance?: number, excludeMask?: number): any;
    raycast(scene: any, camera: any, layer: any, x: number, y: number, distance?: number, excludeMask?: number): any;
    raycastAllColliders(camera: any, x: number, y: number): any;
    getModel(node: Node): MeshRenderer | null;
    updatePositions(comp: MeshRenderer, data: IVec3Like[]): void;
    updateVBAttr(comp: MeshRenderer, attr: string, data: number[]): void;
    updateIB(comp: MeshRenderer, data: number[]): void;
    updateBoundingBox(meshComp: MeshRenderer, minPos?: math.Vec3, maxPos?: math.Vec3): void;
    getBoundingBox(component: Component): import("../../../../utils/aabb").default | geometry.AABB | null;
    getRootBoneNode(component: any): Node | null;
    getRootBindPose(component: any): math.Mat4 | null;
    getCameraData(component: Camera): any;
    setCameraData(component: any, cameraData: any): void;
    getLightData(component: any): any;
    setLightData(component: any, lightData: any): void;
}
declare const _default: Engine3D;
export default _default;
//# sourceMappingURL=3d.d.ts.map