import { EmbeddedPlayerGroup } from 'cc';
import { ICurveDumpData } from './private';

export type IAnimationType = 'cc.Animation' | 'cc.SkeletalAnimation' | 'cc.animation.AnimationController';

export interface IKeyDumpData {
    frame: number;
    dump: any; // value的dump数据
    inTangent?: number;
    inTangentWeight?: number;
    outTangent?: number;
    outTangentWeight?: number;
    interpMode?: number;
    broken?: boolean;
    tangentWeightMode?: number;
    imgUrl?: string;
    easingMethod?: number;
}

export interface IDumpType {
    value: string;
    extends?: string[];
}

export interface IClipInfo {
    name: string;
    uuid: string | undefined;
}

// 动画相关操作的返回值结果
export interface IAniResultBase {
    state: 'success' | 'failure';
    result: any | null;
    reson?: string;
}

export interface IAniEditInfo extends IAniResultBase {
    result: null | {
        root: string;
        node?: any;
        aniComp?: IAnimationType;
        clipsMenu?: IClipInfo[];
        defaultClip?: string;
    }
}

export interface IAnimationEditData {
    root: string;
    curEditClip: AnimationClip | null;
}

export interface IPropCurveDumpData {
    nodePath: string;
    // 原始的 keyframe 数据
    keyframes: IKeyDumpData[];
    displayName: string;
    key: string;
    type?: IDumpType;
    preExtrap: number;
    postExtrap: number;
    isCurveSupport: boolean; // 是否支持贝塞尔曲线编辑
}

export interface IAnimCopyKeySrcInfo {
    curvesDump: IPropCurveDumpData[];
}

export interface IAnimCopyNodeSrcInfo {
    curvesDump: IPropCurveDumpData[];
}

export interface IAnimCopyNodeDstInfo {
    nodePath: string;
}

interface IEventDump {
    frame: number;
    func: string;
    params: string[];
}

interface IEventDump {
    frame: number;
    func: string;
    params: string[];
}

export interface IPlayableInfo {
    type: 'animation-clip' | 'particle-system';
    clip?: string;
    path?: string;
}

export interface IEmbeddedPlayers {
    begin: number;
    end: number;
    reconciledSpeed: boolean;
    playable?: IPlayableInfo;
    group: string;
}

export interface AnimationClipPlayerInfo extends IPlayableInfo {
    clip: string;
    path: string;
}

export interface ParticleSystemPlayerInfo extends IPlayableInfo {
    path: string;
}

export interface EditorAnimationClipDump {
    name: string;
    duration: number;
    sample: number;
    speed: number;
    wrapMode: number;

    curves: ICurveDumpData[];
    events: IEventDump[];
    embeddedPlayers: IEmbeddedPlayers[];
    time: number;
    isLock: boolean;
    embeddedPlayerGroups: EmbeddedPlayerGroup[];
}

export interface EditorEmbeddedPlayer extends IEmbeddedPlayers {
    _embeddedPlayer: any;
}

export interface IAnimCopyEmbeddedPlayersSrcInfo {
    embeddedPlayersDump: IEmbeddedPlayers[];
}

export interface IAnimCopyEventSrcInfo {
    eventsDump: IEventDump[];
}

export interface IAnimCopyPropSrcInfo {
    curvesDump: IPropCurveDumpData[];
}

export interface IAnimCopyPropDstInfo {
    nodePath: string;
    propKeys?: string[];
}

export interface IAnimCopyKeyDstInfo {
    nodePath: string;
    propKeys?: string[];
    startFrame: number;
}

export interface IAnimCopyEventDstInfo {
    startFrame: number;
}