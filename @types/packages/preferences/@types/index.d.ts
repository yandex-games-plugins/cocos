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

export interface PreferencesLaboratory {
    label: string;
    description?: string;
    path: string;
}

export interface PreferencesProperties {
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

export interface PreferencesConfigs {
    [key: string]: {
        custom?: string;
        laboratory?: PreferencesLaboratory[] | null;
        properties?: PreferencesProperties | null;
        title: string;
        version: string;
    }
}

export type PreferencesProtocol = 'default' | 'global' | 'local';

export interface ExportPluginConfigs {
    [key: string]: {
        type?: PreferencesProtocol;
        value: any;
    };
    '__version__'?: string;
}

export interface ExportPreferencesConfigs {
    [key: string]: ExportPluginConfigs;
}
