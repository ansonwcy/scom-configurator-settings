import {
  Module,
  customModule,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  HStack,
  Label,
  VStack,
  Styles,
  Panel,
  LineChart,
  moment
} from '@ijstech/components';
import { IMixedChartConfig, callAPI, formatNumber, groupByCategory, extractUniqueTimes, concatUnique, groupArrayByKey, formatNumberByFormat, getChartType } from './global/index';
import { chartStyle, containerStyle } from './index.css';
import assets from './assets';
import configData from './data.json';
const Theme = Styles.Theme.ThemeVars;

interface ScomMixedChartElement extends ControlElement {
  data: IMixedChartConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-mixed-chart']: ScomMixedChartElement;
    }
  }
}

@customModule
@customElements('i-scom-mixed-chart')
export default class ScomMixedChart extends Module {
  private chartContainer: VStack;
  private vStackInfo: HStack;
  private pnlChart: Panel;
  private loadingElm: Panel;
  private lbTitle: Label;
  private lbDescription: Label;
  private chartData: { [key: string]: string | number }[] = [];
  private apiEndpoint = '';

  private _data: IMixedChartConfig = { apiEndpoint: '', options: undefined };
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  static async create(options?: ScomMixedChartElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomMixedChartElement) {
    super(parent, options);
  }

  private getData() {
    return this._data;
  }

  private async setData(data: IMixedChartConfig) {
    this._data = data;
    this.updateChartData();
  }

  private getTag() {
    return this.tag;
  }

  private async setTag(value: any) {
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

  // getConfigSchema() {
  //   return this.getThemeSchema();
  // }

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

  private getPropertiesSchema(readOnly?: boolean) {
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
                globalSeriesType: {
                  type: 'string',
                  enum: [
                    'bar',
                    'line',
                    'area',
                    'scatter'
                  ],
                  required: true
                },
                smooth: {
                  type: 'boolean'
                },
                stacking: {
                  type: 'boolean'
                },
                legend: {
                  type: 'object',
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
                leftYAxis: {
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
                    }
                  }
                },
                rightYAxis: {
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
                      type: {
                        type: 'string',
                        enum: [
                          'bar',
                          'line',
                          'area',
                          'scatter'
                        ],
                        required: true
                      },
                      yAxis: {
                        type: 'string',
                        enum: [
                          'left',
                          'right'
                        ],
                        required: true
                      },
                      zIndex: {
                        type: 'number'
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
    }
    return propertiesSchema as any;
  }

  private getThemeSchema(readOnly?: boolean) {
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
    }
    return themeSchema as IDataSchema;
  }

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          let _oldData: IMixedChartConfig = { apiEndpoint: '', options: undefined };
          return {
            execute: async () => {
              _oldData = {...this._data};
              if (userInputData?.apiEndpoint !== undefined) this._data.apiEndpoint = userInputData.apiEndpoint;
              if (userInputData?.options !== undefined) this._data.options = userInputData.options;
              if (builder?.setData) builder.setData(this._data);
              this.setData(this._data);
            },
            undo: () => {
              if (builder?.setData) builder.setData(_oldData);
              this.setData(_oldData);
            },
            redo: () => { }
          }
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
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/title',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/description',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/xColumn',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/yColumns',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/groupBy',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/globalSeriesType',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/smooth',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/stacking',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/legend',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/showSymbol',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/showDataLabels',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/percentage',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/xAxis',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/leftYAxis',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/rightYAxis',
                },
                {
                  type: 'Control',
                  scope: '#/properties/options/properties/options/properties/seriesOptions',
                  options: {
                    detail: {
                      type: 'VerticalLayout'
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          let oldTag = {};
          return {
            execute: async () => {
              if (!userInputData) return;
              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder) builder.setTag(userInputData);
              else this.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder) builder.setTag(this.tag);
              else this.setTag(this.tag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ]
    return actions
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return this._getActions(this.getPropertiesSchema(), this.getThemeSchema());
        },
        getData: this.getData.bind(this),
        setData: async (data: IMixedChartConfig) => {
          const defaultData = configData.defaultBuilderData;
          await this.setData({...defaultData, ...data});
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => {
          return this._getActions(this.getPropertiesSchema(true), this.getThemeSchema(true))
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private updateTheme() {
    if (this.chartContainer) {
      this.chartContainer.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    }
    this.updateStyle('--text-primary', this.tag?.fontColor);
    this.updateStyle('--background-main', this.tag?.backgroundColor);
  }

  private onUpdateBlock() {
    this.renderChart();
    this.updateTheme();
  }

  private async updateChartData() {
    if (this._data.apiEndpoint === this.apiEndpoint) {
      this.onUpdateBlock();
      return;
    }
    const apiEndpoint = this._data.apiEndpoint;
    this.apiEndpoint = apiEndpoint;
    if (apiEndpoint) {
      this.loadingElm.visible = true;
      const data = await callAPI(apiEndpoint);
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

  private renderChart() {
    if ((!this.pnlChart && this._data.options) || !this._data.options) return;
    const { title, description, options } = this._data.options;
    this.lbTitle.caption = title;
    this.lbDescription.caption = description;
    this.lbDescription.visible = !!description;
    this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
    const { xColumn, yColumns, groupBy, globalSeriesType, seriesOptions, smooth, stacking, legend, showSymbol, showDataLabels, percentage, xAxis, leftYAxis, rightYAxis } = options;
    const { key, type } = xColumn;
    let _legend = {
      show: legend?.show,
    }
    if (legend?.position) {
      _legend[legend.position] = 'auto';
      if (['left', 'right'].includes(legend.position)) {
        _legend['orient'] = 'vertical';
      }
    }
    if (legend?.scroll) {
      _legend['type'] = 'scroll';
    }
    let yAxisMapping: { [key: string]: boolean } = {};
    let labelFormats: { [key: string]: string } = {};
    for (const opt of seriesOptions) {
      yAxisMapping[opt.yAxis] = true;
      labelFormats[opt.title || opt.key] = opt.yAxis === 'left' ? leftYAxis?.labelFormat : rightYAxis?.labelFormat;
    }
    let _yAxis = [];
    Object.keys(yAxisMapping).map(v => {
      const yAxis = v === 'left' ? leftYAxis : rightYAxis;
      _yAxis.push({
        type: 'value',
        name: yAxis?.title || '',
        nameLocation: 'center',
        nameGap: yAxis?.title ? 40 : 15,
        nameTextStyle: {
          fontWeight: 'bold'
        },
        position: v,
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false,
          fontSize: 10,
          position: 'end',
          formatter: (value: number, index: number) => {
            return formatNumber(value, { format: yAxis?.tickFormat, decimals: 2, percentValues: percentage })
          }
        },
        splitNumber: 4
      })
    });
    let _series = [];
    let arr = this.chartData;
    const item = (arr && arr[0]) || {};
    if (groupBy && item[groupBy] !== undefined) {
      const group = groupByCategory(arr, groupBy, key, yColumns[0]);
      const times = extractUniqueTimes(arr, key);
      let groupData: { [key: string]: any[] } = {};
      const keys = Object.keys(group);
      keys.map(v => {
        const _data = concatUnique(times, group[v]);
        groupData[v] = groupArrayByKey(Object.keys(_data).map(m => [type === 'time' ? new Date(m) : m, _data[m]]));
      });
      const isPercentage = percentage && groupData[keys[0]] && typeof groupData[keys[0]][0][1] === 'number';
      _series = keys.map(v => {
        const seriesOpt = seriesOptions?.find(f => f.key === v);
        let _data = [];
        if (isPercentage) {
          _data = groupData[v].map((vals, idx) => {
            let total = 0;
            for (const k of keys) {
              total += groupData[k][idx][1];
            }
            return [vals[0], (vals[1] / total) * 100];
          });
        } else {
          _data = groupData[v];
        }
        const isArea = (!seriesOpt?.type && globalSeriesType === 'area') || seriesOpt?.type === 'area';
        const lineStyle = isArea ? {
          border: 'transparent',
          width: 0
        } : undefined;
        return {
          name: seriesOpt?.title || v,
          type: getChartType(seriesOpt?.type || globalSeriesType, 'line'),
          stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
          smooth: smooth,
          itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
          lineStyle,
          areaStyle: isArea ? {} : undefined,
          emphasis: {
            focus: 'series'
          },
          showSymbol: !!showSymbol,
          symbolSize: seriesOpt?.type === 'scatter' ? 6 : undefined,
          label: showDataLabels ? {
            show: true,
            formatter: function (params: any) {
              return formatNumber(params.value);
            }
          } : undefined,
          data: _data,
          z: seriesOpt?.zIndex,
          yAxisIndex: seriesOpt?.yAxis ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
        }
      });
    } else {
      let groupData: { [key: string]: any[] } = {};
      let isPercentage = percentage && arr.length > 0;
      yColumns.map(col => {
        if (isPercentage && typeof arr[0][col] !== 'number') {
          isPercentage = false;
        }
        groupData[col] = groupArrayByKey(arr.map(v => [type === 'time' ? new Date(v[key]) : col, v[col]]));
      });
      _series = yColumns.map((col) => {
        let _data = [];
        const seriesOpt = seriesOptions?.find(f => f.key === col);
        if (isPercentage) {
          _data = groupData[col].map((vals, idx) => {
            let total = 0;
            for (const k of yColumns) {
              total += groupData[k][idx][1];
            }
            return [vals[0], (vals[1] / total) * 100];
          });
        } else {
          _data = groupData[col];
        }
        const isArea = (!seriesOpt?.type && globalSeriesType === 'area') || seriesOpt?.type === 'area';
        const lineStyle = isArea ? {
          border: 'transparent',
          width: 0
        } : undefined;
        return {
          name: seriesOpt?.title || col,
          type: getChartType(seriesOpt?.type || globalSeriesType, 'line'),
          stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
          smooth: smooth,
          itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
          lineStyle,
          areaStyle: isArea ? {} : undefined,
          emphasis: {
            focus: 'series'
          },
          showSymbol: !!showSymbol,
          symbolSize: seriesOpt?.type === 'scatter' ? 6 : undefined,
          label: showDataLabels ? {
            show: true,
            formatter: function (params: any) {
              return formatNumber(params.value);
            }
          } : undefined,
          data: _data,
          z: seriesOpt?.zIndex,
          yAxisIndex: seriesOpt?.yAxis ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
        }
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

    const _chartData: any = {
      tooltip: {
        trigger: 'axis',
        position: function (point: any, params: any, dom: any, rect: any, size: any) {
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
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          return [x, y];
        },
        formatter: (params: any) => {
          let res = `<b>${xColumn.type === 'time' ? moment(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
          if (_series.length === 1) {
            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? formatNumber(params[0].value[1], { percentValues: true }) : formatNumberByFormat(params[0].value[1], labelFormats[params[0].seriesName])}</div>`;
          } else {
            for (const param of params) {
              if (param.value[1] !== null) {
                res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? formatNumber(param.value[1], { percentValues: true }) : formatNumberByFormat(param.value[1], labelFormats[param.seriesName])}</div>`;
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
        inverse: xAxis?.reverseValues,
        name: xAxis?.title || '',
        nameLocation: 'center',
        nameGap: xAxis?.title ? 25 : 15,
        nameTextStyle: {
          fontWeight: 'bold'
        },
        axisLabel: {
          fontSize: 10,
          formatter: xAxis?.tickFormat ? (value: number, index: number) => {
            if (type === 'time') {
              return moment(value).format(xAxis.tickFormat)
            } else {
              if (isNaN(value)) return value;
              return formatNumber(value, { format: xAxis.tickFormat, decimals: 2 })
            }
          } : undefined
        }
      },
      yAxis: _yAxis.map(v => {
        return {
          ...v,
          min: isSingle ? min : undefined,
          max: isSingle ? max : undefined,
          interval: isSingle ? roundedInterval : undefined,
        }
      }),
      series: _series
    };
    this.pnlChart.clearInnerHTML();
    const chart = new LineChart(this.pnlChart, {
      data: _chartData,
      width: '100%',
      height: '100%'
    });
    chart.data = _chartData;
    chart.drawChart();
  }

  private resizeChart() {
    if (this.pnlChart) {
      (this.pnlChart.firstChild as LineChart)?.resize();
    }
  }

  async init() {
    this.isReadyCallbackQueued = true;
    this.updateTheme();
    super.init();
    this.classList.add(chartStyle);
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
    return (
      <i-vstack
        id="chartContainer"
        position="relative"
        background={{ color: Theme.background.main }}
        height="100%"
        padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        class={containerStyle}
      >
        <i-vstack id="loadingElm" class="i-loading-overlay">
          <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
            <i-icon
              class="i-loading-spinner_icon"
              image={{ url: assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
            />
          </i-vstack>
        </i-vstack>
        <i-vstack
          id="vStackInfo"
          width="100%"
          maxWidth="100%"
          margin={{ left: 'auto', right: 'auto', bottom: 10 }}
          verticalAlignment="center"
        >
          <i-label id="lbTitle" font={{ bold: true, color: Theme.text.primary }} />
          <i-label id="lbDescription" margin={{ top: 5 }} font={{ color: Theme.text.primary }} />
        </i-vstack>
        <i-panel id="pnlChart" width="100%" height="inherit" />
      </i-vstack>
    )
  }
}