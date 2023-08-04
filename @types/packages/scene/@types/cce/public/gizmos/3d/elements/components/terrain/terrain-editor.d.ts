import { eTerrainEditorMode, TerrainEditorMode } from './terrain-editor-mode';
import { Terrain, Camera } from 'cc';
import TerrainGizmo from './terrain-gizmo';
export declare class TerrainEditor {
    static Instance: TerrainEditor;
    private _terrain;
    private _modes;
    private _currentMode;
    private _cameraComp;
    isChanged: boolean;
    private _gizmo?;
    constructor(cameraComp: Camera, gizmo: TerrainGizmo);
    setEditTerrain(t: Terrain | null): void;
    getEditTerrain(): Terrain | null;
    setMode(mode: eTerrainEditorMode): void;
    clearBrush(): void;
    getMode(mode: eTerrainEditorMode): TerrainEditorMode;
    getCurrentMode(): TerrainEditorMode | null;
    getCurrentModeType(): eTerrainEditorMode;
    setCurrentLayer(id: number): void;
    getCurrentLayer(): number;
    update(dtime: number, isShiftDown: boolean): void;
    onMouseDown(x: number, y: number): void;
    onMouseUp(x?: number, y?: number): void;
    onMouseMove(x: number, y: number): void;
}
//# sourceMappingURL=terrain-editor.d.ts.map