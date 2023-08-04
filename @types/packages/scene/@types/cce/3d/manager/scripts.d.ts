/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class ScriptManager extends EventEmitter {
    /**
     * 当脚本刷新并执行完成时触发。
     */
    readonly EXECUTION_FINISHED = "execution-finished";
    private _executor;
    private _suspendPromise;
    private _asyncIteration;
    constructor();
    /**
     * 挂起脚本管理器直到 `condition` 结束，才会进行下一次执行。
     * @param condition
     */
    suspend(condition: Promise<void>): void;
    init(): Promise<void>;
    investigatePackerDriver(): Promise<void>;
    /**
     * 传入一个 uuid 返回这个 uuid 对应的脚本组件名字
     * @param uuid
     */
    queryScriptName(uuid: string): Promise<string | null>;
    /**
     * 传入一个 uuid 返回这个 uuid 对应的脚本的 cid
     * @param uuid
     */
    queryScriptCid(uuid: string): Promise<string | null>;
    _loadScripts(): Promise<void>;
    loadScript(uuid: string): Promise<void>;
    removeScript(_asset: any): Promise<void>;
    scriptChange(_asset: any): Promise<void>;
    private _executeAsync;
    private _execute;
    private _loadPluginScripts;
    private _handleImportException;
}
declare const _default: ScriptManager;
export default _default;
//# sourceMappingURL=scripts.d.ts.map