import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Container,
  Styles,
  Input,
  Modal,
  Label,
  VStack,
  HStack,
  Panel,
  Pagination,
  observable,
  Tabs,
  Form
} from '@ijstech/components';
import { configStyle } from './index.css'
import { getComponent, commandHistory, IConfig } from './global/index';

const Theme = Styles.Theme.ThemeVars;

interface ScomConfiguratorElement extends ControlElement {

}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-configurator-settings']: ScomConfiguratorElement;
    }
  }
}

const pageSize = 6;

@customModule
@customElements('i-scom-configurator-settings')
export default class ConfiguratorSettings extends Module {
  private inputSearch: Input;
  private hStackComponents: HStack;
  private paginationElm: Pagination;
  private mdSettings: Modal;
  private pnlPreview: Panel;
  private pnlTabs: Panel;
  private builderTarget: any;
  private item: any;
  private currentId = 0;
  private _data = [];
  private _direction = false;

  @observable()
  private totalPage = 0;
  private pageNumber = 0;
  private itemStart = 0;
  private itemEnd = pageSize;

  public onSaveConfigData: any;

  set data(value: IConfig[]) {
    this._data = value;
    this.resetPaging();
  }

  get data() {
    return this._data || [];
  }

  set direction(value: boolean) {
    this._direction = value;
    this.updateFormStyle();
  }

  get direction() {
    return this._direction;
  }

  static async create(options?: ScomConfiguratorElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomConfiguratorElement) {
    super(parent, options);
  }

  private get componentsData() {
    const searchVal = (this.inputSearch.value || '').toLowerCase();
    if (!searchVal) return this.data;
    return this.data.filter(v => v.title.toLowerCase().includes(searchVal) || v.description?.toLowerCase().includes(searchVal));
  }

  private get componentsDataPagination() {
    return this.componentsData.slice(this.itemStart, this.itemEnd);
  }

  private updateFormStyle = () => {
    if (!this.pnlTabs) return;
    if (this.direction) {
      this.pnlTabs.classList.add('is-direction');
    } else {
      this.pnlTabs.classList.remove('is-direction');
    }
  }

  private onSelectIndex = () => {
    const pageNumber = this.paginationElm.currentPage;
    this.pageNumber = pageNumber;
    this.itemStart = (pageNumber - 1) * pageSize;
    this.itemEnd = this.itemStart + pageSize;
    this.renderComponents();
  }

  private resetPaging = () => {
    this.pageNumber = 1;
    this.itemStart = 0;
    this.itemEnd = this.itemStart + pageSize;
    if (this.paginationElm) {
      this.paginationElm.currentPage = 1;
      this.renderComponents();
    }
  }

  private renderComponents = () => {
    let nodes = [];
    this.totalPage = Math.ceil(this.componentsData.length / pageSize);
    this.paginationElm.visible = this.totalPage > 1;
    if (!this.componentsDataPagination.length) {
      this.hStackComponents.clearInnerHTML();
      this.hStackComponents.appendChild(<i-label caption="No components" margin={{ top: 'auto', bottom: 'auto' }} />);
      return;
    }
    for (const item of this.componentsDataPagination) {
      const pnl = new Panel(undefined, {
        width: 'calc(33.33% - 7px)',
        minWidth: 200,
        minHeight: 100,
        border: { radius: 8, width: 1, style: 'solid', color: Theme.text.primary },
        padding: { top: 10, bottom: 10, left: 10, right: 10 }
      });
      pnl.classList.add('pointer');
      pnl.onClick = () => this.showDetail(item);
      const vStack = new VStack(pnl, {
        gap: 10,
        verticalAlignment: 'center',
        horizontalAlignment: 'center',
        margin: { top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }
      });
      const lbTitle = new Label(vStack, { caption: item.title, font: { size: '16px' } });
      lbTitle.classList.add('text-capitalize', 'text-center');
      if (item.description) {
        const lbDesc = new Label(vStack, { caption: item.description });
        lbDesc.classList.add('text-capitalize', 'text-center')
      }
      nodes.push(pnl);
    }
    this.hStackComponents.clearInnerHTML();
    this.hStackComponents.append(...nodes);
  }

  private onSearch = () => {
    this.resetPaging();
  }

  private closeDetail = () => {
    this.mdSettings.visible = false;
    this.pnlPreview.clearInnerHTML();
  }

  showDetail = async (item: any) => {
    this.currentId = item.id;
    this.item = item;
    let name = item.name;
    if (!name) {
      name = this.data.find(f => f.id == this.currentId).name;
    }
    const containerModule: any = await getComponent(name);
    this.pnlPreview.clearInnerHTML();
    this.pnlPreview.appendChild(<i-label caption="Preview" font={{ size: '16px', bold: true }} margin={{ bottom: 10 }} />);
    this.pnlPreview.appendChild(containerModule);
    await containerModule.ready();
    if (containerModule?.getConfigurators) {
      const configurator = containerModule.getConfigurators().find((configurator: any) => configurator.target === "Builders");
      if (configurator?.setData) {
        await configurator.setData(item.properties);
      }
      if (configurator?.setTag && item.tag) {
        await configurator.setTag(item.tag);
      }
      this.renderSettings(configurator, item);
    } else {
      this.builderTarget = null;
      this.pnlTabs.clearInnerHTML();
    }
    this.mdSettings.visible = true;
  }

  private onSave = async () => {
    const data = this.builderTarget?.getData ? await this.builderTarget.getData() : this.item.properties;
    const tag = this.builderTarget?.getTag ? await this.builderTarget.getTag() : this.item.tag;
    this.mdSettings.visible = false;
    if (this.onSaveConfigData) this.onSaveConfigData({ componentId: Number(this.currentId), ...data }, tag);
  }

  private onConfirm = (result: boolean, data: any, action: any) => {
    if (result) {
      const commandIns = action.command(action, data);
      commandHistory.execute(commandIns);
    } else if (data?.errors) {
      console.log(data.errors);
    }
  }

  private renderTab = (tabs: Tabs, target: any, data: any, title: string) => {
    if (target) {
      const opt = {
        jsonSchema: target.userInputDataSchema,
        jsonUISchema: target.userInputUISchema,
        data: data
      }
      const tab = new Panel();
      tab.classList.add('custom-settings--ui');
      tabs.add({ caption: title, icon: target.icon ? { name: target.icon, fill: Theme.colors.primary.contrastText } : undefined, children: tab });
      if (target.customUI) {
        const element = target.customUI.render({ ...data }, (result: boolean, data: any) => this.onConfirm(result, data, target));
        tab.append(element);
      } else {
        const self = this;
        const form = new Form();
        tab.append(form);
        form.uiSchema = opt.jsonUISchema;
        form.jsonSchema = opt.jsonSchema;
        form.formOptions = {
          columnWidth: '100%',
          columnsPerRow: 1,
          confirmButtonOptions: {
            caption: 'Confirm',
            backgroundColor: Theme.colors.primary.main,
            fontColor: Theme.colors.primary.contrastText,
            hide: false,
            onClick: async () => {
              const data = await form.getFormData();
              self.onConfirm(true, data, target)
            }
          },
          dateTimeFormat: {
            date: 'YYYY-MM-DD',
            time: 'HH:mm:ss',
            dateTime: 'MM/DD/YYYY HH:mm'
          }
        };
        form.renderForm();
        form.clearFormData();
        form.setFormData({ ...data });
      }
    }
  }

  private renderSettings = async (builderTarget: any, item: any) => {
    this.builderTarget = builderTarget;
    const data = builderTarget?.getData ? await builderTarget.getData() : item.properties;
    const tag = builderTarget?.getTag ? await builderTarget.getTag() : item.tag;
    const actions = builderTarget?.getActions() || [];
    const general = actions.find((v: any) => ['Settings', 'General'].includes(v.name));
    const commissions = actions.find((v: any) => ['Commissions'].includes(v.name));
    const theme = actions.find((v: any) => ['Theme Settings', 'Theme'].includes(v.name));
    const advanced = actions.find((v: any) => ['Advanced'].includes(v.name));
    const tabs = await Tabs.create();
    this.pnlTabs.clearInnerHTML();
    this.pnlTabs.appendChild(tabs);
    this.renderTab(tabs, general, data, 'General');
    this.renderTab(tabs, commissions, data, 'Commissions');
    this.renderTab(tabs, theme, tag, 'Theme');
    this.renderTab(tabs, advanced, data, 'Advanced');
    tabs.activeTabIndex = 0;
  }

  async init() {
    super.init();
    this.updateFormStyle();
    this.renderComponents();
  }

  render() {
    return (
      <i-vstack gap={8} padding={{ top: '1rem', bottom: '1rem' }} class={configStyle}>
        <i-input
          id="inputSearch"
          width={300}
          maxWidth="100%"
          height={32}
          border={{ radius: 5, style: 'solid', width: 1, color: Theme.text.primary }}
          placeholder="Search components"
          onChanged={this.onSearch}
        />
        <i-hstack
          id="hStackComponents"
          minHeight={120}
          gap={10}
          wrap="wrap"
          horizontalAlignment="center"
        />
        <i-pagination
          id="paginationElm"
          margin={{ top: 16, bottom: 16, left: 'auto', right: 'auto' }}
          width="auto"
          currentPage={this.pageNumber}
          totalPages={this.totalPage}
          onPageChanged={this.onSelectIndex}
        />
        <i-modal
          id="mdSettings"
          width={1300}
        >
          <i-hstack gap={20} horizontalAlignment="end">
            <i-icon width={20} height={20} class="pointer icon-close" name="times" fill={Theme.colors.primary.main} onClick={this.closeDetail} />
          </i-hstack>
          <i-hstack gap={20} padding={{ top: 20, bottom: 20, left: 20, right: 20 }} horizontalAlignment="center" wrap="wrap">
            <i-panel id="pnlPreview" width="calc(50% - 10px)" minWidth={400} />
            <i-vstack gap={10} width="calc(50% - 10px)" minWidth={400}>
              <i-label caption="Settings" font={{ size: '16px', bold: true }} />
              <i-panel id="pnlTabs" width="100%" />
              <i-button id="btnSave" caption="Save" width={200} margin={{ left: 'auto', right: 'auto' }} padding={{ top: 8, bottom: 8 }} font={{ color: Theme.colors.primary.contrastText }} onClick={this.onSave} />
            </i-vstack>
          </i-hstack>
        </i-modal>
      </i-vstack>
    )
  }
}