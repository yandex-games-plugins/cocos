/**
 * web-adapter provides an fake web env for native engine;
 * it is conflict with electron web env,so we need to override electron web env.
 * @param webAdapterPath file path
 */
export declare function importWebAdapter(webAdapterPath: string): void;
export interface EngineAddon {
    initEngine(): void;
    tick(): void;
}
export declare function importNativeEngine(enginePath: string): EngineAddon;
//# sourceMappingURL=adapter-util.d.ts.map