import { Asset } from 'cc';
declare class AssetUpdater {
    lockNum: number;
    timer: any;
    lock(): void;
    unlock(): void;
    private update;
    queue: Map<string, Asset | null>;
    add(uuid: string, asset: Asset | null): void;
    remove(uuid: string): void;
}
declare class AssetWatcherManager {
    updater: AssetUpdater;
    initHandle(obj: any): void;
    startWatch(obj: any): void;
    stopWatch(obj: any): void;
    onAssetChanged(uuid: string): Promise<void>;
    onAssetDeleted(uuid: string, url: any): void;
}
declare const assetWatcherManager: AssetWatcherManager;
export { assetWatcherManager };
//# sourceMappingURL=asset-watcher.d.ts.map