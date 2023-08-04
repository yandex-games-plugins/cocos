/**
 * 编辑器预览时，加载编辑器代码等操作
 */
declare class EditorPreview {
    engineInfo: any;
    start(): Promise<void>;
    private _startEngine;
    private _startEditor;
    private _startPreview;
}
declare const _default: EditorPreview;
export default _default;
//# sourceMappingURL=editor-preview.d.ts.map