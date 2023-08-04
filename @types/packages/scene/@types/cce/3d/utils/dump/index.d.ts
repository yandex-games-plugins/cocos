import { Node, Component } from "cc";
declare class DumpUtil {
  /**
   * 生成一个 node 的 dump 数据
   * @param {*} node
   */
  dumpNode(node: Node): any;
  dumpComponent(comp: Component): any;
  /**
   * 恢复一个 dump 数据到 property
   * @param node
   * @param path
   * @param dump
   */
  restoreProperty(
    node: Node | Component,
    path: string,
    dump: any
  ): Promise<any>;
  /**
   * 恢复一个 dump 数据到 property
   * @param node
   * @param path
   */
  resetProperty(node: Node | Component, path: string): Promise<any>;
  /**
   * 将一个属性其现存值与定义类型值不匹配，或者为 null 默认值，改为一个可编辑的值
   * @param node
   * @param path
   */
  updatePropertyFromNull(node: Node | Component, path: string): Promise<any>;
  /**
   * 还原一个节点的全部属性
   * @param {*} node
   * @param {*} dump
   */
  restoreNode(node: Node, dump: any): Promise<any>;
  /**
   * 解析节点的访问路径
   * @param path
   * @returns
   */
  parsingPath(
    path: string,
    data: any
  ): {
    search: string;
    key: string;
  };
  /**
   * encodeObject
   */
  encodeObject(
    object: any,
    attributes: any,
    owner?: any,
    objectKey?: string,
    isTemplate?: boolean
  ): import("../../../../public").IProperty;
  /**
   * 获取类型的默认dump数据
   * @param type
   * @returns
   */
  getDefaultValue(type: string | undefined): any;
}
declare const _default: DumpUtil;
export default _default;
//# sourceMappingURL=index.d.ts.map
