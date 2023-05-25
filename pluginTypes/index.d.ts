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
        name: string;
        title: string;
        description?: string;
        properties: {
            [key: string]: any;
        };
    }
    export * from "@scom/scom-configurator-settings/global/utils.ts";
}
/// <amd-module name="@scom/scom-configurator-settings" />
declare module "@scom/scom-configurator-settings" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig } from "@scom/scom-configurator-settings/global/index.ts";
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
        private item;
        private currentId;
        private _data;
        private totalPage;
        private pageNumber;
        private itemStart;
        private itemEnd;
        onSaveConfigData: any;
        set data(value: IConfig[]);
        get data(): IConfig[];
        static create(options?: ScomConfiguratorElement, parent?: Container): Promise<ConfiguratorSettings>;
        constructor(parent?: Container, options?: ScomConfiguratorElement);
        private get componentsData();
        private get componentsDataPagination();
        private onSelectIndex;
        private resetPaging;
        private renderComponents;
        private onSearch;
        private closeDetail;
        private showDetail;
        private onSave;
        private onConfirm;
        private renderSettings;
        init(): Promise<void>;
        render(): any;
    }
}
