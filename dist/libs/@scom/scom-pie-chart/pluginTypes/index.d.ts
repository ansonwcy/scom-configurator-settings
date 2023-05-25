/// <amd-module name="@scom/scom-pie-chart/global/interfaces.ts" />
declare module "@scom/scom-pie-chart/global/interfaces.ts" {
    export interface IPieChartOptions {
        title: string;
        description?: string;
        options: {
            xColumn: string;
            yColumn: string;
            serieName?: string;
            legend?: {
                show?: boolean;
                scroll?: boolean;
                position?: 'top' | 'bottom' | 'left' | 'right';
            };
            showDataLabels?: boolean;
            numberFormat?: string;
            valuesOptions?: {
                name: string;
                color: string;
            }[];
        };
    }
    export interface IPieChartConfig {
        apiEndpoint: string;
        options: IPieChartOptions;
    }
}
/// <amd-module name="@scom/scom-pie-chart/global/utils.ts" />
declare module "@scom/scom-pie-chart/global/utils.ts" {
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const callAPI: (apiEndpoint: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-pie-chart/global/index.ts" />
declare module "@scom/scom-pie-chart/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export * from "@scom/scom-pie-chart/global/interfaces.ts";
    export * from "@scom/scom-pie-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-pie-chart/index.css.ts" />
declare module "@scom/scom-pie-chart/index.css.ts" {
    export const containerStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-pie-chart/assets.ts" />
declare module "@scom/scom-pie-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-pie-chart/data.json.ts" />
declare module "@scom/scom-pie-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            apiEndpoint: string;
            options: {
                title: string;
                options: {
                    xColumn: string;
                    yColumn: string;
                    serieName: string;
                    numberFormat: string;
                    showDataLabels: boolean;
                    valuesOptions: {
                        name: string;
                        color: string;
                    }[];
                };
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-pie-chart" />
declare module "@scom/scom-pie-chart" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { IPieChartConfig } from "@scom/scom-pie-chart/global/index.ts";
    interface ScomPieChartElement extends ControlElement {
        data: IPieChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-pie-chart']: ScomPieChartElement;
            }
        }
    }
    export default class ScomPieChart extends Module {
        private pieChartContainer;
        private vStackInfo;
        private pnlPieChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private pieChartData;
        private apiEndpoint;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomPieChartElement, parent?: Container): Promise<ScomPieChart>;
        constructor(parent?: Container, options?: ScomPieChartElement);
        private getData;
        private setData;
        private getTag;
        private setTag;
        private getPropertiesSchema;
        private getThemeSchema;
        private _getActions;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        title: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        title?: undefined;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                        title?: undefined;
                    })[];
                };
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema?: undefined;
            })[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateChartData;
        private renderChart;
        private resizeChart;
        init(): Promise<void>;
        render(): any;
    }
}
