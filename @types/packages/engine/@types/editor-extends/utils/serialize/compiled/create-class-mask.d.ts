/// <reference types="../../../../node_modules/cc/cc" />
import { deserialize } from 'cc';
import D = deserialize.Internal;
declare type IClass = D.IClass_;
declare type IMask = D.IMask_;
import { ClassNode, CustomClassNode } from './types';
export default function (classNodes: (ClassNode | CustomClassNode)[]): {
    sharedClasses: (IClass | string)[];
    sharedMasks: IMask[];
};
export {};
//# sourceMappingURL=create-class-mask.d.ts.map