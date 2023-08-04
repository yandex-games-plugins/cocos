import * as babel from '@babel/core';

export interface IPhysicsConfig {
    gravity: IVec3Like; // （0，-10， 0）
    allowSleep: boolean; // true
    sleepThreshold: number; // 0.1，最小 0
    autoSimulation: boolean; // true
    fixedTimeStep: number; // 1 / 60 ，最小 0
    maxSubSteps: number; // 1，最小 0
    defaultMaterial?: string; // 物理材质 uuid
    useNodeChains: boolean; // true
    collisionMatrix: ICollisionMatrix;
    physicsEngine: string;
}

export type IConsoleType = 'log' | 'warn' | 'error' | 'debug';

/**
 * 构建所需的完整参数
 */
export interface IBuildTaskOption {
    taskId?: string; // 指定构建任务 id，可选
    // 构建后的游戏文件夹生成的路径
    buildPath: string;
    debug: boolean;
    inlineSpriteFrames: boolean;
    md5Cache: boolean;

    // bundle 设置
    mainBundleCompressionType: BundleCompressionType;
    mainBundleIsRemote: boolean;
    useBuiltinServer: boolean; // 使用内置的服务器地址，实验性功能
    server?: string; // 服务器地址
    // 小游戏平台将会自动勾选
    moveRemoteBundleScript: boolean;

    mergeJson: boolean;
    name: string;
    // packAutoAtlas: boolean;
    platform: Platform;
    scenes: IBuildSceneItem[];
    skipCompressTexture: boolean;
    sourceMaps: boolean;
    startScene: string;
    outputName: string;
    experimentalEraseModules: boolean;
    polyfills?: IPolyFills;
    nextStages?: string[];

    // 构建阶段性任务绑定分组
    buildStageGroup?: Record<string, string[]>;

    /**
     * 是否是预览进程发送的构建请求。
     * @default false
     */
    preview?: boolean;

    // 项目设置
    includeModules?: string[];
    renderPipeline?: string;
    designResolution?: IBuildDesignResolution;
    physicsConfig?: IPhysicsConfig;
    flags?: Record<string, boolean>;
    customLayers: {name: string, value: number}[];
    sortingLayers: {id: number, name: string, value: number}[];

    // 是否使用自定义插屏选项
    useSplashScreen?: boolean;
    splashScreen: ISplashSetting;

    packages?: Record<string, any>;
    id?: string; // 手动配置构建任务 id
    // recompileConfig?: IRecompileConfig;

    // 一些偏好设置选项
    useBuildAssetCache?: boolean;
    useBuildEngineCache?: boolean;
    useBuildTextureCompressCache?: boolean;
    useBuildAutoAtlasCache?: boolean;
    __version__?: string;
}

export type UUID = string;

export interface ISplashSetting {
    displayRatio: number;
    totalTime: number;
    watermarkLocation: 'default' | 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    autoFit: boolean;

    url?: string;

    // 运行时使用的数据
    bgBase64?: string;
    base64src?: string;
}


export interface ICustomJointTextureLayout {
    textureLength: number;
    contents: IChunkContent[];
}

export interface IChunkContent {
    skeleton: null | string;
    clips: string[];
}

/**
 * 构建使用的设计分辨率数据
 */
export interface IBuildDesignResolution {
    height: number;
    width: number;
    fitWidth?: boolean;
    fitHeight?: boolean;
}

/**
 * 构建使用的场景的数据
 */
export interface IBuildSceneItem {
    url: string;
    uuid: string;
    inBundle?: boolean;
}

export interface IPolyFills {
    /**
     * True if async functions polyfills(i.e. regeneratorRuntime) needs to be included.
     * You need to turn on this field if you want to use async functions in language.
     */
    asyncFunctions?: boolean;

    /**
     * If true, [core-js](https://github.com/zloirock/core-js) polyfills are included.
     * The default options of [core-js-builder](https://github.com/zloirock/core-js/tree/master/packages/core-js-builder)
     * will be used to build the core-js.
     */
    coreJs?: boolean;

    targets?: string;
}

// **************************** options *******************************************
export type Platform =
    | 'web-desktop'
    | 'web-mobile'
    | 'wechatgame'
    | 'oppo-mini-game'
    | 'vivo-mini-game'
    | 'huawei-quick-game'
    | 'alipay-mini-game'
    | 'taobao-creative-app'
    | 'mac'
    | 'ios'
    | 'linux'
    // | 'ios-app-clip'
    | 'android'
    | 'ohos'
    | 'open-harmonyos'
    | 'windows'
    | 'xiaomi-quick-game'
    | 'baidu-mini-game'
    | 'bytedance-mini-game'
    | 'cocos-play'
    | 'huawei-agc'
    | 'link-sure'
    | 'qtt'
    | 'fb-instant-games'
    | 'cocos-runtime'
    | 'xr-meta'
    | 'xr-huaweivr'
    | 'xr-pico'
    | 'xr-rokid'
    | 'xr-monado'
    | 'ar-android'
    | 'ar-ios'
    | 'xr-spaces'
    | 'xr-seed'
    | 'online'
    ;

export type BundleCompressionType = 'none' | 'merge_dep' | 'merge_all_json' | 'subpackage' | 'zip';
export type IModules = 'esm' | 'commonjs' | 'systemjs';

export interface ITransformOptions {
    importMapFormat: IModules;
    plugins?: babel.PluginItem[];
}

export type ITaskState = 'waiting' | 'success' | 'failure' | 'cancel' | 'processing';

export interface ITaskItemJSON{
    id: string;
    progress: number;
    state: ITaskState;
    message: string;
    time: string;
}

export interface IBuildTaskItemJSON extends ITaskItemJSON {
    stage: 'build' | string;
    options: IBuildTaskOption;
    dirty: boolean;
    rawOptions?: IBuildTaskOption;
    type: 'build',
}

export type IOrientation = 'auto' | 'landscape' | 'portrait';