/// <amd-module name="@scom/scom-scatter-chart/global/interfaces.ts" />
declare module "@scom/scom-scatter-chart/global/interfaces.ts" {
    export interface IScatterChartOptions {
        title: string;
        description?: string;
        options: {
            xColumn: {
                key: string;
                type: 'time' | 'category';
            };
            yColumns: string[];
            groupBy?: string;
            seriesOptions?: {
                key: string;
                title?: string;
                color?: string;
            }[];
            stacking?: boolean;
            xAxis?: {
                title?: string;
                tickFormat?: string;
                reverseValues?: boolean;
            };
            yAxis?: {
                title?: string;
                tickFormat?: string;
                labelFormat?: string;
                position?: 'left' | 'right';
            };
            smooth?: boolean;
            legend?: {
                show?: boolean;
                scroll?: boolean;
                position?: 'top' | 'bottom' | 'left' | 'right';
            };
            showSymbol?: boolean;
            showDataLabels?: boolean;
            percentage?: boolean;
        };
    }
    export interface IScatterChartConfig {
        apiEndpoint: string;
        options: IScatterChartOptions;
    }
}
/// <amd-module name="@scom/scom-scatter-chart/global/utils.ts" />
declare module "@scom/scom-scatter-chart/global/utils.ts" {
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const groupArrayByKey: (arr: [Date | string, string | number][]) => any[];
    export const groupByCategory: (data: {
        [key: string]: any;
    }[], category: string, xAxis: string, yAxis: string) => {
        [key: string]: any;
    };
    export const extractUniqueTimes: (data: {
        [key: string]: any;
    }[], keyValue: string) => {
        [key: string]: any;
    };
    export const concatUnique: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => {};
    export const callAPI: (apiEndpoint: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-scatter-chart/global/index.ts" />
declare module "@scom/scom-scatter-chart/global/index.ts" {
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
    export * from "@scom/scom-scatter-chart/global/interfaces.ts";
    export * from "@scom/scom-scatter-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-scatter-chart/index.css.ts" />
declare module "@scom/scom-scatter-chart/index.css.ts" {
    export const containerStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-scatter-chart/assets.ts" />
declare module "@scom/scom-scatter-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-scatter-chart/data.json.ts" />
declare module "@scom/scom-scatter-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            apiEndpoint: string;
            options: {
                title: string;
                options: {
                    xColumn: {
                        key: string;
                        type: string;
                    };
                    yColumns: string[];
                    seriesOptions: {
                        key: string;
                        title: string;
                    }[];
                    xAxis: {
                        title: string;
                        tickFormat: string;
                    };
                    yAxis: {
                        labelFormat: string;
                        position: string;
                    };
                };
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-scatter-chart" />
declare module "@scom/scom-scatter-chart" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { IScatterChartConfig } from "@scom/scom-scatter-chart/global/index.ts";
    interface ScomScatterChartElement extends ControlElement {
        data: IScatterChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-scatter-chart']: ScomScatterChartElement;
            }
        }
    }
    export default class ScomScatterChart extends Module {
        private chartContainer;
        private vStackInfo;
        private pnlChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private chartData;
        private apiEndpoint;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomScatterChartElement, parent?: Container): Promise<ScomScatterChart>;
        constructor(parent?: Container, options?: ScomScatterChartElement);
        private getData;
        private setData;
        private getTag;
        private setTag;
        private getPropertiesSchema;
        private getThemeSchema;
        private _getActions;
        getConfigurators(): ({
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
            setData: (data: IScatterChartConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
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
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
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
