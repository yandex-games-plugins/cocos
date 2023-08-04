/// <reference types="../../../../node_modules/cc/cc" />
import { deserialize } from 'cc';
import D = deserialize.Internal;
declare type IFileData = D.IFileData_;
declare type IPackedFileData = D.IPackedFileData_;
export default function packJSONs(datas: IFileData[]): IPackedFileData;
export {};
//# sourceMappingURL=pack-jsons.d.ts.map