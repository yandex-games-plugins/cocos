/// <reference types="../../../../node_modules/cc/cc" />
import { ValueType, deserialize } from 'cc';
import { Node, IRefsBuilder, TraceableDict } from './types';
import { IBuilder, IBuilderOptions, PropertyOptions, IArrayOptions, IClassOptions, ICustomClassOptions, IObjParsingInfo } from '../parser';
import D = deserialize.Internal;
declare type Empty = D.Empty_;
import File = D.File_;
declare type IFileData = D.IFileData_;
declare type IRefs = D.IRefs_;
export declare const FORMAT_VERSION = 1;
declare namespace RefsBuilder {
    class Impl implements IRefsBuilder {
        private beforeOffsetRefs;
        private afterOffsetRefs;
        private ctx;
        constructor(ctx: Builder);
        addRef(owner: Node, key: string | number, target: Node): number;
        build(): IRefs | null;
    }
}
export declare function reduceEmptyArray<T extends any[]>(array: T): T | Empty;
export default class Builder implements IBuilder {
    stringify: boolean;
    minify: boolean;
    noNativeDep: boolean;
    sharedUuids: TraceableDict<string>;
    sharedStrings: TraceableDict<string>;
    refsBuilder: RefsBuilder.Impl;
    dependAssets: (string | number | Node)[];
    private rootNode;
    private normalNodes;
    private advancedNodes;
    private classNodes;
    private data;
    constructor(options: IBuilderOptions);
    setProperty_Array(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: IArrayOptions): IObjParsingInfo;
    setProperty_Dict(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: PropertyOptions): IObjParsingInfo;
    setProperty_Class(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: IClassOptions): IObjParsingInfo;
    setProperty_CustomizedClass(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: ICustomClassOptions): IObjParsingInfo;
    setProperty_ParsedObject(ownerInfo: IObjParsingInfo, key: string | number, valueInfo: IObjParsingInfo, formerlySerializedAs: string | null): void;
    setProperty_Raw(owner: object, ownerInfo: IObjParsingInfo, key: string | number, value: any, options: PropertyOptions): void;
    setProperty_ValueType(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, value: ValueType, options: PropertyOptions): IObjParsingInfo | null;
    setProperty_TypedArray(owner: object, ownerInfo: IObjParsingInfo, key: string | number, value: any, options: PropertyOptions): void;
    setProperty_AssetUuid(owner: object, ownerInfo: IObjParsingInfo, key: string | number, uuid: string, options: PropertyOptions): void;
    setRoot(objInfo: IObjParsingInfo): void;
    private setDynamicProperty;
    private collectInstances;
    private dumpInstances;
    private dumpInstanceTypes;
    private dumpDependUuids;
    dump(): object | string;
}
export declare function getRootData(data: IFileData): IFileData[File.Instances];
export {};
//# sourceMappingURL=builder.d.ts.map