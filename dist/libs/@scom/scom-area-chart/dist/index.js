var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-area-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-area-chart/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callAPI = exports.concatUnique = exports.extractUniqueTimes = exports.groupByCategory = exports.groupArrayByKey = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    ///<amd-module name='@scom/scom-area-chart/global/utils.ts'/> 
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${exports.formatNumberWithSeparators(num, 2)}%`;
        }
        if (format) {
            return exports.formatNumberByFormat(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return exports.formatNumberWithSeparators((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return exports.formatNumberWithSeparators((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return exports.formatNumberWithSeparators((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return exports.formatNumberWithSeparators(num);
        }
        if (absNum < 0.00001) {
            return exports.formatNumberWithSeparators(num, 6);
        }
        if (absNum < 0.001) {
            return exports.formatNumberWithSeparators(num, 4);
        }
        return exports.formatNumberWithSeparators(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return exports.formatNumberWithSeparators(num);
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return exports.formatNumberWithSeparators((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = exports.formatNumberWithSeparators(num, decimalPlaces);
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = exports.formatNumber(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision || precision === 0) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const groupArrayByKey = (arr) => {
        return arr.reduce((acc, [key, value]) => {
            const group = acc.find(([k, _]) => k.toString() === key.toString());
            if (group) {
                const val = group[1];
                group[1] = val === null ? value : isNaN(Number(val)) ? val : Number(val) + Number(value);
            }
            else {
                acc.push([key, value]);
            }
            return acc;
        }, []);
    };
    exports.groupArrayByKey = groupArrayByKey;
    const groupByCategory = (data, category, xAxis, yAxis) => {
        return data.reduce((result, item) => {
            const _category = item[category];
            if (!result[_category]) {
                result[_category] = {};
            }
            result[_category][item[xAxis]] = item[yAxis];
            return result;
        }, {});
    };
    exports.groupByCategory = groupByCategory;
    const extractUniqueTimes = (data, keyValue) => {
        return data.reduce((acc, cur) => {
            if (!acc.hasOwnProperty(cur[keyValue])) {
                acc[cur[keyValue]] = null;
            }
            return acc;
        }, {});
    };
    exports.extractUniqueTimes = extractUniqueTimes;
    const concatUnique = (obj1, obj2) => {
        const merged = Object.assign(Object.assign({}, obj1), obj2);
        return Object.keys(merged).reduce((acc, key) => {
            if (!acc.hasOwnProperty(key)) {
                acc[key] = merged[key];
            }
            return acc;
        }, {});
    };
    exports.concatUnique = concatUnique;
    const callAPI = async (apiEndpoint) => {
        if (!apiEndpoint)
            return [];
        try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (error) {
            console.log(error);
        }
        return [];
    };
    exports.callAPI = callAPI;
});
define("@scom/scom-area-chart/global/index.ts", ["require", "exports", "@scom/scom-area-chart/global/interfaces.ts", "@scom/scom-area-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-area-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10
    });
    exports.chartStyle = components_1.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-area-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-area-chart/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-area-chart/data.json.ts'/> 
    exports.default = {
        defaultBuilderData: {
            apiEndpoint: "/dune/query/2030745",
            options: {
                title: 'ETH Staked - Cumulative',
                options: {
                    xColumn: {
                        key: 'date',
                        type: 'time'
                    },
                    yColumns: [
                        'total_eth',
                    ],
                    stacking: true,
                    groupBy: 'depositor_entity_category',
                    seriesOptions: [
                        {
                            key: 'CEX',
                            color: '#d52828'
                        },
                        {
                            key: 'Liquid Staking',
                            color: '#d2da25'
                        },
                        {
                            key: 'Others',
                            color: '#000000'
                        },
                        {
                            key: 'Staking Pools',
                            color: '#49a34f'
                        },
                        {
                            key: 'Unidentified',
                            color: '#bcb8b8'
                        }
                    ],
                    xAxis: {
                        title: 'Date',
                        tickFormat: 'MMM YYYY'
                    },
                    yAxis: {
                        title: 'ETH deposited',
                        labelFormat: '0,000.00ma',
                        position: 'left'
                    }
                }
            }
        }
    };
});
define("@scom/scom-area-chart", ["require", "exports", "@ijstech/components", "@scom/scom-area-chart/global/index.ts", "@scom/scom-area-chart/index.css.ts", "@scom/scom-area-chart/assets.ts", "@scom/scom-area-chart/data.json.ts"], function (require, exports, components_3, index_1, index_css_1, assets_1, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomAreaChart = class ScomAreaChart extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.chartData = [];
            this.apiEndpoint = '';
            this._data = { apiEndpoint: '', options: undefined };
            this.tag = {};
            this.defaultEdit = true;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        getConfigSchema() {
            return this.getThemeSchema();
        }
        // onConfigSave(config: any) {
        //   this.tag = config;
        //   this.onUpdateBlock();
        // }
        // async edit() {
        //   // this.chartContainer.visible = false
        // }
        // async confirm() {
        //   this.onUpdateBlock();
        //   // this.chartContainer.visible = true
        // }
        // async discard() {
        //   // this.chartContainer.visible = true
        // }
        // async config() { }
        getPropertiesSchema(readOnly) {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    apiEndpoint: {
                        type: 'string',
                        title: 'API Endpoint',
                        required: true
                    },
                    options: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                                required: true
                            },
                            description: {
                                type: 'string'
                            },
                            options: {
                                type: 'object',
                                properties: {
                                    xColumn: {
                                        type: 'object',
                                        title: 'X column',
                                        required: true,
                                        properties: {
                                            key: {
                                                type: 'string',
                                                required: true
                                            },
                                            type: {
                                                type: 'string',
                                                enum: ['time', 'category'],
                                                required: true
                                            }
                                        }
                                    },
                                    yColumns: {
                                        type: 'array',
                                        title: 'Y columns',
                                        required: true,
                                        items: {
                                            type: 'string'
                                        }
                                    },
                                    groupBy: {
                                        type: 'string'
                                    },
                                    smooth: {
                                        type: 'boolean'
                                    },
                                    stacking: {
                                        type: 'boolean'
                                    },
                                    legend: {
                                        type: 'object',
                                        title: 'Show Chart Legend',
                                        properties: {
                                            show: {
                                                type: 'boolean'
                                            },
                                            scroll: {
                                                type: 'boolean'
                                            },
                                            position: {
                                                type: 'string',
                                                enum: ['top', 'bottom', 'left', 'right']
                                            }
                                        }
                                    },
                                    showSymbol: {
                                        type: 'boolean'
                                    },
                                    showDataLabels: {
                                        type: 'boolean'
                                    },
                                    percentage: {
                                        type: 'boolean'
                                    },
                                    xAxis: {
                                        type: 'object',
                                        properties: {
                                            title: {
                                                type: 'string'
                                            },
                                            tickFormat: {
                                                type: 'string'
                                            },
                                            reverseValues: {
                                                type: 'boolean'
                                            }
                                        }
                                    },
                                    yAxis: {
                                        type: 'object',
                                        properties: {
                                            title: {
                                                type: 'string'
                                            },
                                            tickFormat: {
                                                type: 'string'
                                            },
                                            labelFormat: {
                                                type: 'string'
                                            },
                                            position: {
                                                type: 'string',
                                                enum: ['left', 'right']
                                            }
                                        }
                                    },
                                    seriesOptions: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                key: {
                                                    type: 'string',
                                                    required: true
                                                },
                                                title: {
                                                    type: 'string'
                                                },
                                                color: {
                                                    type: 'string',
                                                    format: 'color'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return propertiesSchema;
        }
        getThemeSchema(readOnly) {
            const themeSchema = {
                type: 'object',
                properties: {
                    darkShadow: {
                        type: 'boolean'
                    },
                    fontColor: {
                        type: 'string',
                        format: 'color'
                    },
                    backgroundColor: {
                        type: 'string',
                        format: 'color'
                    },
                    width: {
                        type: 'string'
                    },
                    height: {
                        type: 'string'
                    }
                }
            };
            return themeSchema;
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', options: undefined };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint) !== undefined)
                                    this._data.apiEndpoint = userInputData.apiEndpoint;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/apiEndpoint',
                                title: 'API Endpoint'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/title'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/description'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/options',
                                options: {
                                    detail: {
                                        type: 'VerticalLayout'
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return this._getActions(this.getPropertiesSchema(), this.getThemeSchema());
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        return this._getActions(this.getPropertiesSchema(true), this.getThemeSchema(true));
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c;
            if (this.chartContainer) {
                this.chartContainer.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            if (this._data.apiEndpoint === this.apiEndpoint) {
                this.onUpdateBlock();
                return;
            }
            const apiEndpoint = this._data.apiEndpoint;
            this.apiEndpoint = apiEndpoint;
            if (apiEndpoint) {
                this.loadingElm.visible = true;
                const data = await index_1.callAPI(apiEndpoint);
                this.loadingElm.visible = false;
                if (data && this._data.apiEndpoint === apiEndpoint) {
                    this.chartData = data;
                    this.onUpdateBlock();
                    return;
                }
            }
            this.chartData = [];
            this.onUpdateBlock();
        }
        renderChart() {
            if ((!this.pnlChart && this._data.options) || !this._data.options)
                return;
            const { title, description, options } = this._data.options;
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            const { xColumn, yColumns, groupBy, seriesOptions, smooth, stacking, legend, showSymbol, showDataLabels, percentage, xAxis, yAxis } = options;
            const { key, type } = xColumn;
            let _legend = {
                show: legend === null || legend === void 0 ? void 0 : legend.show,
            };
            if (legend === null || legend === void 0 ? void 0 : legend.position) {
                _legend[legend.position] = 'auto';
                if (['left', 'right'].includes(legend.position)) {
                    _legend['orient'] = 'vertical';
                }
            }
            if (legend === null || legend === void 0 ? void 0 : legend.scroll) {
                _legend['type'] = 'scroll';
            }
            let _series = [];
            let arr = this.chartData;
            const item = (arr && arr[0]) || {};
            if (groupBy && item[groupBy] !== undefined) {
                const group = index_1.groupByCategory(arr, groupBy, key, yColumns[0]);
                const times = index_1.extractUniqueTimes(arr, key);
                let groupData = {};
                const keys = Object.keys(group);
                keys.map(v => {
                    const _data = index_1.concatUnique(times, group[v]);
                    groupData[v] = index_1.groupArrayByKey(Object.keys(_data).map(m => [type === 'time' ? new Date(m) : m, _data[m]]));
                });
                const isPercentage = percentage && groupData[keys[0]] && typeof groupData[keys[0]][0][1] === 'number';
                _series = keys.map(v => {
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === v);
                    let _data = [];
                    if (isPercentage) {
                        _data = groupData[v].map((vals, idx) => {
                            let total = 0;
                            for (const k of keys) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[v];
                    }
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || v,
                        type: 'line',
                        stack: stacking,
                        smooth: smooth,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        lineStyle: {
                            border: 'transparent',
                            width: 0
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return index_1.formatNumber(params.value);
                            }
                        } : undefined,
                        data: _data
                    };
                });
            }
            else {
                let groupData = {};
                let isPercentage = percentage && arr.length > 0;
                yColumns.map(col => {
                    if (isPercentage && typeof arr[0][col] !== 'number') {
                        isPercentage = false;
                    }
                    groupData[col] = index_1.groupArrayByKey(arr.map(v => [type === 'time' ? new Date(v[key]) : col, v[col]]));
                });
                _series = yColumns.map((col) => {
                    let _data = [];
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === col);
                    if (isPercentage) {
                        _data = groupData[col].map((vals, idx) => {
                            let total = 0;
                            for (const k of yColumns) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[col];
                    }
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || col,
                        type: 'line',
                        stack: stacking,
                        smooth: smooth,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        lineStyle: {
                            border: 'transparent',
                            width: 0
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return index_1.formatNumber(params.value);
                            }
                        } : undefined,
                        data: _data
                    };
                });
            }
            let min = 0, max = 0;
            const isSingle = _series.length === 1;
            if (isSingle) {
                const arr = _series[0].data.filter(v => v[1] !== null).map(v => v[1]);
                min = Math.min(...arr);
                max = Math.max(...arr);
                const step = (max - min) / 5;
                min = min > step ? min - step : min;
                max += step;
            }
            const minInterval = (max - min) / 4;
            const power = Math.pow(10, Math.floor(Math.log10(minInterval)));
            const roundedInterval = Math.ceil(minInterval / power) * power;
            const _chartData = {
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom, rect, size) {
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = document.documentElement.clientWidth;
                        var viewHeight = document.documentElement.clientHeight;
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        // calculate x position of tooltip
                        if (x + boxWidth > viewWidth) {
                            x = x - boxWidth;
                        }
                        // calculate y position of tooltip
                        if (y + boxHeight > viewHeight) {
                            y = y - boxHeight;
                        }
                        if (x < 0)
                            x = 0;
                        if (y < 0)
                            y = 0;
                        return [x, y];
                    },
                    formatter: (params) => {
                        let res = `<b>${xColumn.type === 'time' ? components_3.moment(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
                        if (_series.length === 1) {
                            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? index_1.formatNumber(params[0].value[1], { percentValues: true }) : index_1.formatNumberByFormat(params[0].value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
                        }
                        else {
                            for (const param of params) {
                                if (param.value[1] !== null) {
                                    res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? index_1.formatNumber(param.value[1], { percentValues: true }) : index_1.formatNumberByFormat(param.value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
                                }
                            }
                        }
                        return res;
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            show: false
                        }
                    }
                },
                legend: _legend,
                xAxis: {
                    type: type,
                    boundaryGap: false,
                    inverse: xAxis === null || xAxis === void 0 ? void 0 : xAxis.reverseValues,
                    name: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) ? 25 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    axisLabel: {
                        fontSize: 10,
                        formatter: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.tickFormat) ? (value, index) => {
                            if (type === 'time') {
                                return components_3.moment(value).format(xAxis.tickFormat);
                            }
                            else {
                                if (isNaN(value))
                                    return value;
                                return index_1.formatNumber(value, { format: xAxis.tickFormat, decimals: 2 });
                            }
                        } : undefined
                    }
                },
                yAxis: {
                    type: 'value',
                    name: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) ? 40 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    position: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.position) || 'left',
                    min: isSingle ? min : undefined,
                    max: isSingle ? max : undefined,
                    interval: isSingle ? roundedInterval : undefined,
                    axisLabel: {
                        showMinLabel: false,
                        showMaxLabel: false,
                        fontSize: 10,
                        position: 'end',
                        formatter: (value, index) => {
                            return index_1.formatNumber(value, { format: yAxis === null || yAxis === void 0 ? void 0 : yAxis.tickFormat, decimals: 2, percentValues: percentage });
                        }
                    },
                    splitNumber: 4
                },
                series: _series
            };
            this.pnlChart.clearInnerHTML();
            const chart = new components_3.LineChart(this.pnlChart, {
                data: _chartData,
                width: '100%',
                height: '100%'
            });
            chart.data = _chartData;
            chart.drawChart();
        }
        resizeChart() {
            var _a;
            if (this.pnlChart) {
                (_a = this.pnlChart.firstChild) === null || _a === void 0 ? void 0 : _a.resize();
            }
        }
        async init() {
            this.isReadyCallbackQueued = true;
            this.updateTheme();
            super.init();
            this.classList.add(index_css_1.chartStyle);
            const { width, height, darkShadow } = this.tag || {};
            this.width = width || 700;
            this.height = height || 500;
            this.maxWidth = '100%';
            this.chartContainer.style.boxShadow = darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData(data);
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resizeChart();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "chartContainer", position: "relative", background: { color: Theme.background.main }, height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true, color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, font: { color: Theme.text.primary } })),
                this.$render("i-panel", { id: "pnlChart", width: "100%", height: "inherit" })));
        }
    };
    ScomAreaChart = __decorate([
        components_3.customModule,
        components_3.customElements('i-scom-area-chart')
    ], ScomAreaChart);
    exports.default = ScomAreaChart;
});
