export interface message extends EditorMessageMap {
    'query-information': {
        params: [
            string,
            { force?: boolean },
        ],
        result: {
            enable: boolean;
            complete: boolean;
            form: string;
        } | null,
    },
    'information-dialog': {
        params: [
            string,
            { [key: string]: string }
        ],
        result: {
            action: 'reject' | 'resolve' | 'cancel' | 'unusual',
        },
    },
}
