import { IBundleConfig, ISettings } from './public/build-result';
import { IBuildTaskItemJSON } from './public/options';
export interface message extends EditorMessageMap {
    'open': {
        params: [],
        result: void,
    },
    'query-worker-ready': {
        params: [],
        result: boolean,
    },

    // 'open-devtools': {
    //     params: [],
    //     result: void,
    // },
    // 'generate-preview-setting': {
    //     params: any[],
    //     result: Promise<{
    //         settings: ISettings;
    //         script2library: Record<string, string>;
    //         bundleConfigs: IBundleConfig[];
    //     }>,
    // },
    // 'query-tasks-info': {
    //     params: [],
    //     result: {
    //         queue: Record<string, IBuildTaskItemJSON>,
    //         free: Promise<boolean>,
    //     },
    // },
    // 'query-task': {
    //     params: string[],
    //     result: Promise<IBuildTaskItemJSON>,
    // },
    // /**
    //  * 预览合图
    //  * @param {object} pacUuid
    //  */
    // 'preview-pac': {
    //     params: string[],
    //     result: Promise<IBuildTaskItemJSON>,
    // },

}
