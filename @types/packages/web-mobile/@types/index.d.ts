/// <reference path='../../../@types/index'/>
export * from '@editor/library-type/packages/builder/@types/protect';

import { IInternalBuildOptions, IPolyFills, ISettings, InternalBuildResult, IBuildPaths } from '@editor/library-type/packages/builder/@types/protect';

export type IOrientation = 'auto' | 'landscape' | 'portrait';
export interface IOptions {
    orientation: IOrientation;
    embedWebDebugger: boolean;
}
export interface ITaskOption extends IInternalBuildOptions {
    packages: {
        'web-mobile': IOptions;
    }
}

export interface IBuildResult extends InternalBuildResult {
    paths: IPaths;
}

export interface IPaths extends IBuildPaths {
    styleCSS?: string; // style.css 文件地址
    indexJs?: string; // index.js 文件地址
    indexHTML?: string; // index.html 文件地址
}

