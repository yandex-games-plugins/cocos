import { IProperty } from "../../../../public";
import { DumpInterface } from "./dump-interface";
declare class GradientDump implements DumpInterface {
  encode(object: any, data: IProperty, opts?: any): void;
  decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const gradientDump: GradientDump;
export {};
//# sourceMappingURL=gradient-dump.d.ts.map
