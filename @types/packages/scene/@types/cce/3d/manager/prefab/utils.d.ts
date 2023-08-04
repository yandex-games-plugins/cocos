import { Component, Node, Prefab, Scene } from 'cc';
declare type PrefabInfo = Prefab._utils.PrefabInfo;
declare const PrefabInfo: typeof Prefab._utils.PrefabInfo;
declare type PrefabInstance = Prefab._utils.PrefabInstance;
declare const PrefabInstance: typeof Prefab._utils.PrefabInstance;
declare type PropertyOverrideInfo = Prefab._utils.PropertyOverrideInfo;
declare const PropertyOverrideInfo: typeof Prefab._utils.PropertyOverrideInfo;
declare type TargetOverrideInfo = Prefab._utils.TargetOverrideInfo;
declare const TargetOverrideInfo: typeof Prefab._utils.TargetOverrideInfo;
declare enum PrefabState {
    NotAPrefab = 0,
    PrefabChild = 1,
    PrefabInstance = 2,
    PrefabLostAsset = 3
}
declare class PrefabUtil {
    static PrefabState: typeof PrefabState;
    private assetTargetMapCache;
    private prefabAssetNodeInstanceMap;
    getPrefab(node: Node): PrefabInfo | null;
    fireBeforeChangeMsg(node: Node): void;
    fireChangeMsg(node: Node | Scene, opts?: any): void;
    getPrefabAssetNodeInstance(prefabInfo: PrefabInfo): Node | undefined;
    clearCache(): void;
    removePrefabAssetNodeInstanceCache(prefabInfo: PrefabInfo): void;
    getTargetMap(node: Node, useCache?: boolean): {} | undefined;
    private generateTargetMap;
    getPropertyOverrideLocationInfo(node: Node, pathKeys: string[]): {
        outMostPrefabInstanceNode: Node;
        targetPath: string[];
        relativePathKeys: string[];
        target: Node;
    } | null;
    private oldGetDumpableNode;
    getPrefabForSerialize(node: Node, quiet?: boolean | undefined): any;
    addPrefabInfo(node: Node, rootNode: Node, prefab: Prefab | undefined): any;
    walkNode(node: Node, handle: (node: Node, isChild: boolean) => boolean | void, isChild?: boolean): void;
    addPrefabInfoToComponent(comp: Component): void;
    generatePrefabDumpableNode(node: Node, prefab: Prefab): any;
    /**
     * 从一个节点生成 prefab数据
     * 返回序列化数据
     * @param {*} nodeUUID
     */
    generatePrefabDataFromNode(nodeUUID: string | Node): string | null;
    removeMountedRootInfo(node: Node): void;
    generateUUID(): string;
    createPrefabInstance(): Prefab._utils.PrefabInstance;
    createPrefabInfo(fileId: string): Prefab._utils.PrefabInfo;
    cloneInstanceWithNewFileId(instance: PrefabInstance): Prefab._utils.PrefabInstance;
    getPrefabInstanceRoot(node: Node): Node | null;
    isSameSourceTargetOverride(targetOverride: TargetOverrideInfo, source: Component | Node, sourceLocalID: string[] | undefined, propPath: string[]): boolean;
    getSourceData(source: Component): {
        sourceTarget: Node | Component;
        sourceLocalID: string[] | undefined;
    } | null;
    removeTargetOverrideBySource(prefabInfo: PrefabInfo | undefined, source: Node | Component): boolean;
    removeTargetOverride(prefabInfo: PrefabInfo | undefined | null, source: Component, propPath: string[]): boolean;
    isInTargetOverrides(targetOverrides: TargetOverrideInfo[], source: Component, propPath: string[]): boolean;
    getTargetOverride(prefabInfo: PrefabInfo, source: Component, propPath: string[]): Prefab._utils.TargetOverrideInfo | null;
    getPropertyOverridesOfTarget(prefabInstance: PrefabInstance, localID: string[]): Prefab._utils.PropertyOverrideInfo[];
    isInPropertyOverrides(propPath: string[], propertyOverrides: PropertyOverrideInfo[]): boolean;
    getPropertyOverride(prefabInstance: PrefabInstance, localID: string[], propPath: string[]): Prefab._utils.PropertyOverrideInfo;
    removePropertyOverride(prefabInstance: PrefabInstance, localID: string[], propPath: string[]): void;
    findPrefabInstanceMountedChildren(prefabInstance: PrefabInstance, localID: string[]): Prefab._utils.MountedChildrenInfo | null;
    createMountedChildrenInfo(localID: string[]): Prefab._utils.MountedChildrenInfo;
    getPrefabInstanceMountedChildren(prefabInstance: PrefabInstance, localID: string[]): Prefab._utils.MountedChildrenInfo;
    getPrefabInstanceMountedComponents(prefabInstance: PrefabInstance, localID: string[]): Prefab._utils.MountedComponentsInfo;
    addRemovedComponent(prefabInstance: PrefabInstance, localID: string[]): void;
    deleteRemovedComponent(prefabInstance: PrefabInstance, localID: string[]): void;
    /**
     * whether the node is child of a prefab
     * @param node node
     */
    isChildOfPrefabInstance(node: Node): boolean;
    isPrefabInstanceRoot(node: Node): boolean;
    isChildOfPrefabAsset(node: Node): boolean;
    isPartOfPrefabAsset(node: Node): boolean;
    /**
     * whether the node is part of a prefab,
     * root of prefab is also part of prefab
     * @param node node
     */
    isPartOfPrefabInstance(node: Node): boolean;
    isPartOfAssetInPrefabInstance(node: Node): boolean;
    /**
     * 需要考虑很多种嵌套情况,需要注意mountedChild上又挂其它prefab的问题
     * 1. prefabA->node...
     * 2. prefabA->moutedNode->prefabB->node
     * 3. prefabA->moutedPrefabB->node
     * 4. prefabA->moutedPrefabB->prefabC->node
     * 5. prefabA->prefabB->node
     * @param node
     * @returns
     */
    getOutMostPrefabInstanceInfo(node: Node): {
        outMostPrefabInstanceNode: Node | null;
        targetPath: string[];
    };
    isSceneNode(node: Node): boolean;
    getPrefabStateInfo(node: Node): {
        state: PrefabState;
        isUnwrappable: boolean;
        isRevertable: boolean;
        isApplicable: boolean;
        isAddedChild: boolean;
        assetUuid: string;
    };
    getMountedRoot(nodeOrComp: Node | Component): Node | undefined;
    setMountedRoot(nodeOrComp: Node | Component, mountedRoot: Node | undefined): void;
    private isMountedChildOf;
    isMountedComponent(component: Component): boolean;
    getRemovedComponents(node: Node): Component[];
    checkToRemoveTargetOverride(source: Node | Component, root: Node | Scene | null): void;
    findOutmostPrefabInstanceNodes(node: Node, instanceRoots: Node[]): void;
    gatherPrefabInstanceRoots(rootNode: Node | Scene): void;
    isSubAsset(uuid: string): boolean;
    removePrefabInfo(node: Node): void;
    checkMountedRootData(node: Node, recursively: boolean): void;
    removePrefabInstanceRoots(rootNode: Node | Scene): void;
    checkTargetOverridesData(node: Node | Scene): void;
    /**
     * 判断节点是否是最外一层的PrefabInstance的Mounted节点
     * mountedChild的普通子节点也需要判断
     * @param node
     * @returns
     */
    isOutmostPrefabInstanceMountedChildren(node: Node): boolean;
    /**
     * 脚本属性不存在时，或者预制体内的子节点/组件丢失时,要移除数据
     * @param root
     */
    removeInvalidTargetOverrides(root: Node): void;
    /**
     * 清除预制体中，嵌套预制体的propertOverrides对非预制体子节点的引用
     * @param root 预制体根节点
     * @return {nestedPrefabInstanceRoots:{illegalReference}}
     */
    removeInvalidPropertyOverrideReference(root: Node): Map<any, any>;
}
declare const prefabUtils: PrefabUtil;
export { prefabUtils, PrefabState };
//# sourceMappingURL=utils.d.ts.map