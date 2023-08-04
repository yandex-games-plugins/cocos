import { EventEmitter } from '../../../utils/event-emitter';
import { gfx } from 'cc';
export interface IWindowInfo {
    index: number;
    uuid: string;
    name: string;
    window?: any;
}
declare class PreviewBuffer extends EventEmitter {
    private _name;
    device: any;
    width: number;
    height: number;
    data: Uint8Array;
    renderScene: any;
    scene: any;
    windows: any;
    window: null;
    windowList: IWindowInfo[];
    regions: gfx.BufferTextureCopy[];
    beforeDataHandle: any;
    renderData: any;
    queue: any[];
    lock: boolean;
    private _curActiveCameraComp;
    _registerName?: string;
    constructor(registerName: string, name: string, scene?: any);
    resize(width: number, height: number, window?: any): void;
    /**
     * WARNING: DO'NOT USE IT BEFORE DRAW!!!
     */
    clear(): void;
    queryWindowList(): IWindowInfo[];
    createWindow(uuid?: string | null): void;
    removeWindow(uuid: string): void;
    onLoadScene(scene: any): void;
    switchCameras(camera: any, currWindow: any): void;
    changeCamera(index: number): void;
    needInvertGFXApi: gfx.API[];
    /**
     * Preview Buffer实例可能被创建多个，
     * 不能将临时类型数组静态或全局，避免写入其他实例中。
     */
    private uint8ArrayPool;
    copyFrameBuffer(window?: any): any;
    getImageDataInQueue(index: number, width: number, height: number, event: any): void;
    step(): Promise<void>;
    getImageData(index: number, width: number, height: number): Promise<any>;
}
export default PreviewBuffer;
//# sourceMappingURL=buffer.d.ts.map