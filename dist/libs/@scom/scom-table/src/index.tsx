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
  Control,
  Progress,
  Table,
  Panel,
  Pagination,
  Input,
  observable
} from '@ijstech/components';
import { ITableConfig, formatNumberWithSeparators, callAPI, formatNumberByFormat } from './global/index';
import { containerStyle, tableStyle } from './index.css';
import assets from './assets';
import dataJson from './data.json';
const Theme = Styles.Theme.ThemeVars;

const pageSize = 25;

interface ScomTableElement extends ControlElement {
  data: ITableConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-table']: ScomTableElement;
    }
  }
}

@customModule
@customElements('i-scom-table')
export default class ScomTable extends Module {
  private vStackTable: VStack;
  private vStackInfo: HStack;
  private hStackFooter: HStack;
  private loadingElm: Panel;
  private lbTitle: Label;
  private lbDescription: Label;
  private pnlTable: Panel;
  private tableElm: Table;
  private tableData: { [key: string]: string | number }[] = [];
  private paginationElm: Pagination;
  private lbTotal: Label;
  private inputSearch: Input;
  private apiEndpoint = '';

  @observable()
  private totalPage = 0;
  private pageNumber = 0;
  private itemStart = 0;
  private itemEnd = pageSize;

  private _data: ITableConfig = { apiEndpoint: '', options: undefined };
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  static async create(options?: ScomTableElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomTableElement) {
    super(parent, options);
  }

  private getData() {
    return this._data;
  }

  private async setData(data: ITableConfig) {
    this._data = data;
    this.updateTableData();
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

  // onConfigSave(config: any) {
  //   this.tag = config;
  //   this.onUpdateBlock();
  // }

  // async edit() {
  //   // this.vStackTable.visible = false
  // }

  // async confirm() {
  //   this.onUpdateBlock();
  //   // this.vStackTable.visible = true
  // }

  // async discard() {
  //   // this.vStackTable.visible = true
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
            columns: {
              type: 'array',
              required: true,
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    required: true
                  },
                  title: {
                    type: 'string'
                  },
                  alignContent: {
                    type: 'string',
                    enum: [
                      'left',
                      'center',
                      'right'
                    ]
                  },
                  type: {
                    type: 'string',
                    enum: [
                      'normal',
                      'progressbar'
                    ]
                  },
                  numberFormat: {
                    type: 'string'
                  },
                  isHidden: {
                    type: 'boolean'
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
        progressBackgroundColor: {
          type: 'string',
          format: 'color'
        },
        footerBackgroundColor: {
          type: 'string',
          format: 'color'
        },
        footerFontColor: {
          type: 'string',
          format: 'color'
        },
        paginationActiveBackgoundColor: {
          type: 'string',
          format: 'color'
        },
        paginationActiveFontColor: {
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
          let _oldData: ITableConfig = { apiEndpoint: '', options: undefined };
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
              type: 'Control',
              scope: '#/properties/options/properties/columns',
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
        setData: async (data: ITableConfig) => {
          const defaultData = dataJson.defaultBuilderData;
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

  private get dataListFiltered() {
    const searchVal = this.inputSearch?.value.toLowerCase();
    if (searchVal) {
      const cols = this._data?.options?.columns.filter(v => !v.isHidden);
      return this.tableData.filter(v => {
        for (const col of cols) {
          const val = v[col.name];
          if (val?.toString().toLowerCase().includes(searchVal)) {
            return true;
          }
        }
        return false;
      });
    }
    return this.tableData;
  }

  private get dataListPagination() {
    return this.dataListFiltered.slice(this.itemStart, this.itemEnd) || [];
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private updateTheme() {
    if (this.vStackTable) {
      this.vStackTable.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    }
    this.updateStyle('--text-primary', this.tag?.fontColor);
    this.updateStyle('--background-main', this.tag?.backgroundColor);
    this.updateStyle('--colors-info-main', this.tag?.progressBackgroundColor);
    this.updateStyle('--colors-success-light', this.tag?.tableFooterBackgroundColor || '#ffeceb');
    this.updateStyle('--colors-success-contrast_text', this.tag?.tableFooterFontColor);
    this.updateStyle('--colors-success-dark', this.tag?.paginationActiveBackgoundColor || '#e47872');
    this.updateStyle('--colors-secondary-contrast_text', this.tag?.paginationActiveFontColor);
  }

  private onUpdateBlock() {
    this.renderTable();
    this.updateTheme();
  }

  private async updateTableData() {
    if (this.inputSearch) {
      this.inputSearch.value = '';
    }
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
        this.tableData = data;
        this.onUpdateBlock();
        return;
      }
    }
    this.tableData = [];
    this.onUpdateBlock();
  }

  private renderTable(resize?: boolean) {
    if (!this.tableElm && this._data?.options) return;
    const { title, description, columns } = this._data?.options || {};
    this.lbTitle.caption = title;
    this.lbDescription.caption = description;
    this.lbDescription.visible = !!description;
    this.pnlTable.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
    if (!columns?.length) return;
    if (!resize) {
      let cols = [];
      const _columns = columns.filter(v => !v.isHidden);
      for (const column of _columns) {
        const { name, title, alignContent, type, numberFormat, coloredNegativeValues, coloredPositiveValues } = column;
        let totalValue = 0;
        if (type === 'progressbar') {
          totalValue = this.tableData.reduce((acc, cur) => {
            if (cur[name]) {
              return acc + Number(cur[name]);
            }
            return acc;
          }, 0);
        }
        const col = {
          title: title || columns[name]?.title || name,
          fieldName: name,
          textAlign: alignContent,
          onRenderCell: function (source: Control, data: any, rowData: any) {
            const isNumber = typeof data === 'number';
            const hStack = new HStack(undefined, {
              width: '100%',
              gap: 5,
              wrap: type === 'progressbar' ? undefined : 'wrap',
              verticalAlignment: 'center'
            });
            if (type === 'progressbar') {
              new Progress(hStack, {
                width: 60,
                height: 8,
                strokeWidth: 8,
                strokeColor: Theme.colors.info.main,
                percent: (data / totalValue) * 100
              });
            }
            new Label(hStack, {
              caption: isNumber && numberFormat ? formatNumberByFormat(data, numberFormat, true) :
                isNumber ? formatNumberWithSeparators(data) : data,
              font: {
                size: '12px',
                color: Theme.text.primary
              }
            });
            return hStack;
          }
        }
        cols.push(col);
      }
      this.tableElm.columns = cols;
      this.pageNumber = 1;
      const hasData = !!this.tableData.length;
      this.lbTotal.visible = hasData;
      this.inputSearch.visible = hasData;
      this.lbTotal.caption = `${this.tableData.length} ${this.tableData.length === 1 ? 'row' : 'rows'}`;
      this.updateTableUI();
    }
    this.tableElm.height = `${this.pnlTable.offsetHeight - (this.hStackFooter.offsetHeight + 20)}px`;
  }

  private updateTableUI() {
    this.totalPage = Math.ceil(this.dataListFiltered.length / pageSize);
    this.paginationElm.visible = this.totalPage > 1;
    this.tableElm.data = this.dataListPagination;
  }

  private onSelectIndex() {
    this.pageNumber = this.paginationElm.currentPage;
    this.itemStart = (this.pageNumber - 1) * pageSize;
    this.itemEnd = this.itemStart + pageSize;
    this.updateTableUI();
  }

  private onSearch() {
    this.pageNumber = 1;
    this.updateTableUI();
  }

  private resizeTable() {
    this.renderTable(true);
  }

  async init() {
    this.isReadyCallbackQueued = true;
    this.updateTheme();
    super.init();
    this.classList.add(tableStyle);
    const { width, height, darkShadow } = this.tag || {};
    this.width = width || 700;
    this.height = height || 500;
    this.maxWidth = '100%';
    this.vStackTable.style.boxShadow = darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    const data = this.getAttribute('data', true);
    if (data) {
      this.setData(data);
    }
    this.isReadyCallbackQueued = false;
    this.executeReadyCallback();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.resizeTable();
      }, 300);
    });
  }

  render() {
    return (
      <i-vstack
        id="vStackTable"
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
        <i-panel id="pnlTable">
          <i-panel height="inherit">
            <i-table
              id="tableElm"
              width="100%"
              height="100%"
            />
            <i-hstack id="hStackFooter" gap={10} margin={{ top: 16 }} horizontalAlignment="start" verticalAlignment="center" wrap="wrap">
              <i-label
                id="lbTotal"
                visible={false}
                background={{ color: Theme.colors.success.light }}
                padding={{ top: 4.5, bottom: 4.5, right: 8, left: 8 }}
                font={{ size: '12px', color: Theme.colors.success.contrastText }}
              />
              <i-input
                id="inputSearch"
                visible={false}
                background={{ color: Theme.colors.success.light }}
                placeholder="Search"
                width={168}
                padding={{ top: 4, bottom: 4, right: 8, left: 8 }}
                font={{ size: '12px', color: Theme.colors.success.contrastText }}
                onChanged={this.onSearch}
              />
              <i-pagination
                id="paginationElm"
                width="auto"
                currentPage={this.pageNumber}
                totalPages={this.totalPage}
                onPageChanged={this.onSelectIndex.bind(this)}
              />
            </i-hstack>
          </i-panel>
        </i-panel>
      </i-vstack>
    )
  }
}