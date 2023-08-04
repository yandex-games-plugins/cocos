/**
 * 处理CallNativeSceneMethod发过来的消息
 */
declare global {
    export class NativeWindow {
        handler: number;
        constructor(x: number, y: number);
        setPos(x: number, y: number): void;
        setSize(w: number, h: number): void;
        updateContextID(): void;
        renderWindow: any;
    }
}
declare class NativeScene {
    windowMap: Map<string, NativeWindow>;
    createWindow(width: number, height: number, name: string): {
        handler: number;
        isPreviewProcess: boolean;
    };
    resize(x: number, y: number, width: number, height: number, name: string): number | undefined;
    /**
     * change scene's cameras's target window to new window;
     * @param name target window name
     */
    redirectTargetWindow(name: string): void;
    handleInput(type: string, event: any): Promise<void>;
    redraw(): void;
}
declare const _default: NativeScene;
export default _default;
//# sourceMappingURL=native-scene.d.ts.map