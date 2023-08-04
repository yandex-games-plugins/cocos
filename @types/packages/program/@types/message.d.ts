import { IProgramInfo } from './public';

export interface message extends EditorMessageMap {
    "query-program-info": {
        params: [
            string,
        ],
        result: IProgramInfo | null,
    },
    "query-programs": {
        params: [],
        result: Record<string, Record<string, IProgramInfo>>
    }
    "execute": {
        params: [
            string,
            Record<string, any>,
        ],
        result: undefined,
    }
}
