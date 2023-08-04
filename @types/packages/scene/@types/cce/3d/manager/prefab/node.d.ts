import { Component, Node, Prefab, Scene } from "cc";
import { IChangeNodeOptions, IOptionBase } from "../../../../private";
declare type PrefabInfo = Prefab._utils.PrefabInfo;
declare const PrefabInfo: typeof Prefab._utils.PrefabInfo;
declare type PrefabInstance = Prefab._utils.PrefabInstance;
interface IDiffPropertyInfo {
  pathKeys: string[];
  value: any;
}
interface INodePrefabData {
  prefabInfo: PrefabInfo | null;
}
declare class NodeOperation {
  assetToNodesMap: Map<string, Node[]>;
  isRemovingMountedChildren: boolean;
  private _timerUtil;
  onSceneOpened(scene: any): void;
  onNodeRemoved(node: Node): void;
  private checkToAddOverrides;
  onNodeChangedInGeneralMode(
    node: Node,
    opts: IChangeNodeOptions,
    root: Node | Scene | null
  ): void;
  onAddNode(node: Node): void;
  onNodeAdded(node: Node, opts: IOptionBase): void;
  /**
   * 当一个组件需要引用到别的PrefabInstance中的
   * @param target 要检查的组件
   * @param diffInfo 差异数据
   * @param root 根节点
   * @returns
   */
  checkToAddTargetOverride(
    target: Component,
    diffInfo: IDiffPropertyInfo,
    root: Node | null
  ): boolean;
  private checkToAddPropertyOverrides;
  private isInTargetOverrides;
  private isInPropertyOverrides;
  /**
   * 对比得到两个ccClass的差异数据
   * @param curTarget 对比的对象
   * @param comparedTarget 被比较的对象
   * @param propPathKeys 当前对象的属性路径数组
   * @param isModifiedFunc 用于判断属性是否被修改的方法
   * @returns
   */
  private getDiffPropertyInfos;
  private handleDiffPropertyInfos;
  /**
   * 直接通过修改节点路径来判断添加targetOverride信息
   * @param node 修改的节点
   * @param pathKeys 属性键值路径
   */
  private addTargetOverrideWithModifyPath;
  private checkToAddPrefabAssetMap;
  /**
   * 判断是否是需要保留的PropertyOverride
   * @param propOverride Prefab实例
   * @param prefabRootFileId prefab根节点的FileId
   */
  isReservedPropertyOverrides(
    propOverride: Prefab._utils.PropertyOverrideInfo,
    prefabRootFileId: string
  ): boolean;
  /**
   * 移除实例的PropertyOverrides，保留一些一般不需要和PrefabAsset自动同步的覆盖
   * @param prefabInstance Prefab实例
   * @param prefabRootFileId prefab根节点的FileId
   */
  removeModifiedPropertyOverrides(
    prefabInstance: PrefabInstance,
    prefabRootFileId: string
  ): void;
  applyMountedChildren(node: Node): Map<string[], INodePrefabData> | undefined;
  applyPropertyOverrides(node: Node): void;
  applyTargetOverrides(node: Node): Prefab._utils.TargetOverrideInfo[];
  applyRemovedComponents(node: Node): null | undefined;
  protected waitForSceneLoaded(): Promise<boolean>;
  /**
   * 将一个PrefabInstance的数据应用到对应的Asset资源上
   * @param nodeUUID uuid
   */
  applyPrefab(nodeUUID: string): Promise<boolean>;
  private doApplyPrefab;
  private undoApplyPrefab;
  updateChildrenData(node: Node): void;
  private isCircularRefPrefabInstance;
  canBeMadeToPrefabAsset(node: Node): boolean;
  /**
   * 从一个节点生成一个PrefabAsset
   * @param nodeUUID
   */
  createPrefabAssetFromNode(
    nodeUUID: string,
    url: string
  ): Promise<string | null | undefined>;
  /**
   * 将一个 node 与一个 prefab 关联到一起
   * @param {*} nodeUuid 也支持 node 对象,会做为prefab的根节点
   * @param {*} assetUuid 关联的资源
   */
  linkNodeWithPrefabAsset(
    nodeUUID: string | Node,
    assetUuid: string | any
  ): Promise<boolean | undefined>;
  /**
   * 把嵌套预制体的propertOverrides信息更新到新的预制体实例上
   * @param prefabNode 待同步的预制体节点
   * @param root 带有所有预制体实例信息的根节点
   */
  syncPropertyOverrides(prefabNode: Node, rootNode: Node): void;
  syncPrefabInfo(assetNode: Node, dstNode: Node, rootNode: Node): void;
  createReservedPropertyOverrides(node: Node): void;
  revertPropertyOverrideOfTarget(node: Node, opts: IChangeNodeOptions): boolean;
  revertPropertyOverride(
    propOverride: Prefab._utils.PropertyOverrideInfo,
    curNodeTargetMap: any,
    assetTargetMap: any
  ): boolean;
  /**
   * 还原一个PrefabInstance的数据为它所关联的PrefabAsset
   * @param nodeUUID node
   */
  revertPrefab(nodeUUID: Node | string): Promise<boolean>;
  removePrefabInfoFromNode(node: Node, removeNested?: boolean): void;
  removePrefabInfoFromInstanceNode(node: Node, removeNested?: boolean): void;
  removePrefabInstanceAndChangeRoot(
    node: Node,
    rootNode: Node,
    removeNested?: boolean
  ): void;
  /**
   * 解除PrefabInstance对PrefabAsset的关联
   * @param nodeUUID 节点或节点的UUID
   * @param removeNested 是否递归的解除子节点PrefabInstance
   */
  unWrapPrefabInstance(nodeUUID: string | Node, removeNested?: boolean): void;
  unWrapPrefabInstanceInPrefabMode(
    nodeUUID: string | Node,
    removeNested?: boolean
  ): void;
}
declare const nodeOperation: NodeOperation;
export { nodeOperation, INodePrefabData };
//# sourceMappingURL=node.d.ts.map
