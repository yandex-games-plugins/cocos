export type ProjectProtocol = 'default' | 'project';

export interface PanelInfo {
    template?: string;
    style?: string;
    listeners?: { [key: string]: (...arg: any) => {} };
    methods?: { [key: string]: Function };
    $?: { [key: string]: string };
    ready?(): void;
    update?(...args: any[]): void;
    beforeClose?(): void;
    close?(): void;
}

export interface ProjectConfigs {
    [key: string]: {
        title: string;
        version: string;
        tabs: PorjectTabs;
    }
}

export interface PorjectTabs {
    [key: stirng]: {
        content?: ProjectContent | null;
        custom?: string;
        label: string;
    }
}

export interface ProjectContent {
    [key: string]: {
        description?: string;
        label: string;
        render: {
            ui: string;
            attributes?: {
                [key: string]: any;
            };
        }
    }
}

export interface ExportProjectConfigs {
    [key: string]: {
        '__version__'?: string;
        [key: string]: Record<string, any>;
    }
}
