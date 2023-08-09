/// <amd-module name="@scom/scom-configurator-settings/index.css.ts" />
declare module "@scom/scom-configurator-settings/index.css.ts" {
    export const configStyle: string;
}
/// <amd-module name="@scom/scom-configurator-settings/global/utils.ts" />
declare module "@scom/scom-configurator-settings/global/utils.ts" {
    export interface ICommand {
        execute(): any;
        undo(): void;
        redo(): void;
    }
    export class CommandHistory {
        private commands;
        private currentCommandIndex;
        execute(command: ICommand): Promise<void>;
        undo(): void;
        redo(): void;
    }
    export const commandHistory: CommandHistory;
    export const getComponent: (path: string) => Promise<HTMLElement>;
}
/// <amd-module name="@scom/scom-configurator-settings/global/index.ts" />
declare module "@scom/scom-configurator-settings/global/index.ts" {
    export interface IConfig {
        id: number;
        path: string;
        title: string;
        description?: string;
        properties: {
            [key: string]: any;
        };
    }
    export interface ISaveConfigData {
        path: string;
        properties: any;
        tag: any;
    }
    export * from "@scom/scom-configurator-settings/global/utils.ts";
}
/// <amd-module name="@scom/scom-configurator-settings" />
declare module "@scom/scom-configurator-settings" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig, ISaveConfigData } from "@scom/scom-configurator-settings/global/index.ts";
    interface ScomConfiguratorElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-configurator-settings']: ScomConfiguratorElement;
            }
        }
    }
    export default class ConfiguratorSettings extends Module {
        private inputSearch;
        private hStackComponents;
        private paginationElm;
        private mdSettings;
        private pnlPreview;
        private pnlTabs;
        private builderTarget;
        private btnSave;
        private item;
        private currentPath;
        private currentId;
        private _parentTags;
        private _data;
        private _direction;
        private _showSaveBtn;
        private totalPage;
        private pageNumber;
        private itemStart;
        private itemEnd;
        onSaveConfigData: ((data: ISaveConfigData) => void) | null;
        set data(value: IConfig[]);
        get data(): IConfig[];
        set direction(value: boolean);
        get direction(): boolean;
        get parentTags(): any;
        set parentTags(value: any);
        set showSaveBtn(value: boolean);
        get showSaveBtn(): boolean;
        static create(options?: ScomConfiguratorElement, parent?: Container): Promise<ConfiguratorSettings>;
        constructor(parent?: Container, options?: ScomConfiguratorElement);
        private get componentsData();
        private get componentsDataPagination();
        private updateFormStyle;
        private onSelectIndex;
        private resetPaging;
        private renderComponents;
        private onSearch;
        private closeDetail;
        showDetail: (item: any) => Promise<void>;
        private onChange;
        private onSave;
        private onConfirm;
        private renderTab;
        private renderSettings;
        init(): Promise<void>;
        render(): any;
    }
}
