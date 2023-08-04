import { Scene } from 'cc';
import { InteractivePreview } from '../preview/Interactive-preview';
declare class SkeletonPreview extends InteractivePreview {
    private lightComp;
    private _modelNode;
    private _jointMap;
    init(registerName: string, queryName: string): void;
    createNodes(scene: Scene): void;
    setSkeleton(uuid: string): Promise<{
        jointCount: number;
    } | null>;
    setLightEnable(enable: boolean): void;
    onMouseDown(event: any): void;
}
export { SkeletonPreview };
//# sourceMappingURL=index.d.ts.map