/// <reference types="../../../../node_modules/cc/cc" />
import { deserialize } from 'cc';
import D = deserialize.Internal;
declare type OtherObjectData = D.OtherObjectData_;
declare type AnyData = D.AnyData_;
import DataTypeID = D.DataTypeID_;
declare type DataTypes = D.DataTypes_;
declare type IClassObjectData = D.IClassObjectData_;
declare type ICustomObjectData = D.ICustomObjectData_;
declare type ICustomObjectDataContent = D.ICustomObjectDataContent_;
declare type IDictData = D.IDictData_;
declare type IMask = D.IMask_;
declare type IClass = D.IClass_;
export declare class TraceableItem {
    result: any;
    private tracers;
    private keys;
    static compareByRefCount(lhs: TraceableItem, rhs: TraceableItem): number;
    private static readonly NO_RESULT;
    constructor();
    traceBy(tracer: object, key: (string | number)): void;
    movedTo(index: number): void;
}
export declare class TraceableDict<T> {
    static readonly PLACEHOLDER = 0;
    private values;
    trace(source: any, tracer: object, key: (string | number)): TraceableItem;
    traceString(source: string, tracer: object, key: (string | number)): void;
    get(source: any): TraceableItem | undefined;
    getSortedItems(): TraceableItem[];
    dump(offset?: number): T[];
}
export interface IRefsBuilder {
    addRef(owner: Node, key: string | number, target: Node): number;
}
declare type DynamicType = DataTypeID.Array | DataTypeID.Dict | DataTypeID.Class | DataTypeID.CustomizedClass;
declare type DerivedType = DataTypeID.InstanceRef | // 被多个对象复用时
DataTypeID.SimpleType | // 可以完美被 json 序列化时
DataTypeID.Array_AssetRefByInnerObj | DataTypeID.Array_Class | DataTypeID.Array_InstanceRef;
declare type StaticType = DataTypeID.SimpleType | DataTypeID.ValueType | DataTypeID.ValueTypeCreated | DataTypeID.TRS | DataTypeID.AssetRefByInnerObj;
export declare class Node {
    selfType: DynamicType | DerivedType;
    refCount: number;
    indexed: boolean;
    shouldBeIndexed: boolean;
    private _index;
    get instanceIndex(): number;
    set instanceIndex(val: number);
    get refType(): DynamicType | DerivedType;
    static compareByRefCount(lhs: Node, rhs: Node): number;
    constructor(dataTypeID: DynamicType);
    setStatic<T extends StaticType>(key: string | number, dataTypeID: T, data: DataTypes[T]): void;
    setDynamic(target: Node, key?: string | number): void;
    static readonly AssetPlaceholderType = DataTypeID.SimpleType;
    static readonly AssetPlaceholderValue: null;
    setAssetRefPlaceholderOnIndexed(key: string | number): void;
    dumpRecursively(refsBuilder: IRefsBuilder): (IClassObjectData | OtherObjectData);
}
export declare class ArrayNode extends Node {
    types: (DataTypeID | undefined)[];
    datas: (AnyData | Node)[];
    static DeriveTypes: D.DataTypeID_[][];
    constructor(length: number);
    setStatic(key: number, dataTypeID: StaticType, data: AnyData): void;
    setDynamic(target: Node, key: number): void;
    setAssetRefPlaceholderOnIndexed(key: number): void;
    dumpRecursively(refsBuilder: IRefsBuilder): (import("cc").__private._cocos_serialization_deserialize__AnyData | Node)[];
}
export declare class DictNode extends Node {
    data: IDictData;
    json: Record<string, DataTypes[DataTypeID.SimpleType]>;
    dynamics: Record<string, Node>;
    constructor();
    setStatic(key: string, dataTypeID: StaticType, value: AnyData): void;
    setDynamic(target: Node, key: string): void;
    dumpRecursively(refsBuilder: IRefsBuilder): IDictData | object;
}
export declare class ClassNode extends Node {
    ctor: string;
    simpleKeys: string[];
    private simpleValues;
    advanceds: (string | number | boolean | object | number[] | import("cc").__private._cocos_serialization_deserialize__IClassObjectData | import("cc").__private._cocos_serialization_deserialize__IClassObjectData[] | import("cc").__private._cocos_serialization_deserialize__IDictData | import("cc").__private._cocos_serialization_deserialize__IArrayData | import("cc").__private._cocos_serialization_deserialize__IValueTypeData | import("cc").__private._cocos_serialization_deserialize__ITRSData | import("cc").__private._cocos_serialization_deserialize__ICustomObjectData | Node | null | undefined)[];
    dumped: IClassObjectData | undefined;
    static fromData(clazz: IClass, mask: IMask, data: IClassObjectData): ClassNode;
    constructor(ctor: string);
    setStatic(key: string, dataTypeID: StaticType, value: AnyData): void;
    setDynamic(target: Node, key: string): void;
    dumpRecursively(refsBuilder: IRefsBuilder): IClassObjectData;
}
export declare class CustomClassNode extends Node {
    ctor: string;
    content: ICustomObjectDataContent;
    dumped: ICustomObjectData | undefined;
    static fromData(ctor: string, data: ICustomObjectData): CustomClassNode;
    constructor(ctor: string, content: ICustomObjectDataContent);
    setStatic(key: string, dataTypeID: StaticType, value: AnyData): void;
    setDynamic(target: Node, key: string): void;
    dumpRecursively(refsBuilder: IRefsBuilder): ICustomObjectData;
}
export {};
//# sourceMappingURL=types.d.ts.map