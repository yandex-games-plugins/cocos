/// <reference types="../../../../node_modules/cc/cc" />
import { ValueType } from 'cc';
interface IPropertyOptions {
    formerlySerializedAs?: string;
    defaultValue?: any;
    expectedType?: string;
}
export declare type PropertyOptions = IPropertyOptions | null;
export interface IArrayOptions extends IPropertyOptions {
    writeOnlyArray: any[];
}
export interface IClassOptions extends IPropertyOptions {
    type: string;
    /**
     * 此类的实例永远只会被一个地方引用到。
     */
    uniquelyReferenced?: boolean;
}
export interface ICustomClassOptions extends IClassOptions {
    content: any;
}
export interface IObjParsingInfo {
}
export interface IBuilder {
    setProperty_Raw(owner: object, ownerInfo: IObjParsingInfo, key: string | number, value: any, options: PropertyOptions): void;
    setProperty_Class(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: IClassOptions): IObjParsingInfo;
    setProperty_CustomizedClass(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: ICustomClassOptions): IObjParsingInfo;
    setProperty_ValueType(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, value: ValueType, options: PropertyOptions): IObjParsingInfo | null;
    setProperty_TypedArray(owner: object, ownerInfo: IObjParsingInfo, key: string | number, value: any, options: PropertyOptions): void;
    setProperty_AssetUuid(owner: object, ownerInfo: IObjParsingInfo, key: string | number, uuid: string, options: PropertyOptions): void;
    setProperty_Array(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: IArrayOptions): IObjParsingInfo;
    setProperty_Dict(owner: object | null, ownerInfo: IObjParsingInfo | null, key: string | number, options: PropertyOptions): IObjParsingInfo;
    setProperty_ParsedObject(ownerInfo: IObjParsingInfo, key: string | number, valueInfo: IObjParsingInfo, formerlySerializedAs: string | null): void;
    setRoot(objInfo: IObjParsingInfo): void;
    dump(): any;
}
export interface IBuilderOptions {
    builder?: 'dynamic' | 'compiled';
    stringify?: boolean;
    minify?: boolean;
    noNativeDep?: boolean;
    forceInline?: boolean;
    /**
     * Outputs as CCON.
     *
     * CCON denotes `Cocos Creator Object Notation`(let's imagine JSON as JavaScript Object Notation).
     * It allows binary representation of some value but loses the readability.
     *
     * CCON can be represented as two formal:
     * - JSON + Binary file(s)
     * - Single Binary file
     * However `serialize()` produces whole `CCON` and you could select a suitable formal.
     * As Cocos Creator 3.3, the `useCCON` only be turned on
     * when it's going to serialize `AnimationClip` into library or into production.
     */
    useCCON?: boolean;
}
export interface IParserOptions {
    compressUuid?: boolean;
    discardInvalid?: boolean;
    dontStripDefault?: boolean;
    missingClassReporter?: any;
    missingObjectReporter?: any;
    reserveContentsForSyncablePrefab?: boolean;
    _exporting?: boolean;
    useCCON?: boolean;
    keepNodeUuid?: boolean;
    recordAssetDepends?: string[];
}
export declare class Parser {
    exporting: boolean;
    mustCompresseUuid: boolean;
    discardInvalid: boolean;
    dontStripDefault: boolean;
    missingClassReporter: any;
    missingObjectReporter: any;
    reserveContentsForAllSyncablePrefab: boolean;
    keepNodeUuid: boolean;
    recordAssetDepends: IParserOptions['recordAssetDepends'];
    private builder;
    private root;
    private prefabRoot;
    private assetExists;
    private parsingInfos;
    private customExportingCtxCache;
    private _serializationContext;
    private assetDepends?;
    constructor(builder: IBuilder, options: IParserOptions);
    parse(obj: object): void;
    private checkMissingAsset;
    private isObjRemoved;
    private setParsedObj;
    private verifyNotParsedValue;
    private canDiscardByPrefabRoot;
    private enumerateClass;
    static isDefaultTrs(trs: any): boolean;
    private parseField;
    /**
     * 解析对象
     * 1. 调用 builder 的 API 声明一个新的【空对象】
     * 2. 对可引用对象，标记解析状态，防止循环解析
     * 3. 【最后】枚举对象包含的其它属性
     */
    private parseObjField;
    private enumerateDict;
    private enumerateBindedDict;
}
export interface IOptions extends IParserOptions, IBuilderOptions {
}
export default function serialize(obj: Exclude<any, null | undefined>, options: IOptions): string | object;
export {};
//# sourceMappingURL=parser.d.ts.map