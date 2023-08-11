var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
define("@scom/scom-configurator-settings/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.configStyle = components_1.Styles.style({
        $nest: {
            '.text-capitalize': {
                textTransform: 'capitalize !important'
            },
            '.icon-close svg': {
                fill: Theme.colors.primary.main
            },
            '.is-direction': {
                $nest: {
                    'i-tab .tab-item > i-icon svg': {
                        fill: `${Theme.colors.primary.contrastText} !important`,
                    },
                    'i-input': {
                        border: `1px solid ${Theme.input.fontColor}`
                    }
                }
            },
            'i-tab .tab-item > i-icon svg': {
                opacity: 0.55
            },
            'i-tab:not(.disabled).active .tab-item > i-icon svg': {
                opacity: 1
            },
            'i-tab:not(.disabled):hover .tab-item > i-icon svg': {
                opacity: 1
            },
            '#pnlPreview i-input': {
                marginBottom: '0 !important'
            },
            '#pnlPreview :nth-child(2)': {
                marginInline: 'auto '
            },
            '.custom-settings--ui': {
                marginTop: '1rem',
                $nest: {
                    '& > i-form': {
                        display: 'block',
                        height: '100%',
                        $nest: {
                            '& > i-vstack': {
                                overflow: 'auto',
                                minHeight: '300px',
                                maxHeight: 'calc(70vh - 231px)',
                                justifyContent: 'start'
                            },
                            '& > i-panel': {
                                width: '100%',
                                overflow: 'auto',
                                maxHeight: 'calc(70vh - 231px)'
                            },
                            '& > i-vstack > i-panel': {
                                width: '100%'
                            }
                        }
                    },
                    '.form-control > i-panel': {
                        $nest: {
                            '& > i-panel > i-hstack > i-label': {
                                fontSize: '1.25rem !important'
                            },
                            '& > i-hstack > i-hstack > i-label': {
                                fontSize: '1.25rem !important'
                            },
                            'i-color .i-color': {
                                width: '100%'
                            },
                            'i-color .input-span': {
                                width: '100%'
                            }
                        }
                    },
                    'i-combo-box .selection input': {
                        paddingInline: 0
                    }
                }
            },
            '::-webkit-scrollbar': {
                width: '7px',
            },
            '::-webkit-scrollbar-track': {
                borderRadius: '10px',
                border: '1px solid transparent',
                background: `${Theme.action.focus} !important`
            },
            '::-webkit-scrollbar-thumb': {
                background: `${Theme.divider} !important`,
                borderRadius: '10px',
                outline: '1px solid transparent'
            },
            '@media screen and (max-width: 992px)': {
                $nest: {
                    '.custom-settings--ui': {
                        $nest: {
                            '& > i-form > i-vstack > i-panel': {
                                maxHeight: 'auto',
                                overflow: 'auto'
                            }
                        }
                    },
                    '#pnlPreview': {
                        width: '100% !important'
                    },
                    '.custom--divider + i-vstack': {
                        width: '100% !important'
                    },
                    '.custom--divider': {
                        width: '100% !important',
                        height: '2px !important'
                    }
                }
            }
        }
    });
});
define("@scom/scom-configurator-settings/global/utils.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getComponent = exports.commandHistory = exports.CommandHistory = void 0;
    class CommandHistory {
        constructor() {
            this.commands = [];
            this.currentCommandIndex = -1;
        }
        async execute(command) {
            this.commands = this.commands.slice(0, this.currentCommandIndex + 1);
            this.commands.push(command);
            this.currentCommandIndex++;
            await command.execute();
        }
        undo() {
            if (this.currentCommandIndex >= 0) {
                const command = this.commands[this.currentCommandIndex];
                console.log('undo', command);
                command.undo();
                this.currentCommandIndex--;
            }
        }
        redo() {
            if (this.currentCommandIndex < this.commands.length - 1) {
                this.currentCommandIndex++;
                const command = this.commands[this.currentCommandIndex];
                console.log('redo', command);
                command.execute();
            }
        }
    }
    exports.CommandHistory = CommandHistory;
    exports.commandHistory = new CommandHistory();
    const getComponent = async (path) => {
        const element = await components_2.application.createElement(path);
        // application.currentModuleDir = path;
        // await application.loadScript(`${path}/index.js`);
        // application.currentModuleDir = '';
        // const elementName = `i-${path.split('/').pop()}`;
        // const element = document.createElement(elementName);
        return element;
    };
    exports.getComponent = getComponent;
});
define("@scom/scom-configurator-settings/global/index.ts", ["require", "exports", "@scom/scom-configurator-settings/global/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(utils_1, exports);
});
define("@scom/scom-configurator-settings", ["require", "exports", "@ijstech/components", "@scom/scom-configurator-settings/index.css.ts", "@scom/scom-configurator-settings/global/index.ts"], function (require, exports, components_3, index_css_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    const pageSize = 6;
    let ConfiguratorSettings = class ConfiguratorSettings extends components_3.Module {
        set data(value) {
            this._data = value;
            this.resetPaging();
        }
        get data() {
            return this._data || [];
        }
        set direction(value) {
            this._direction = value;
            this.updateFormStyle();
        }
        get direction() {
            return this._direction;
        }
        get parentTags() {
            return this._parentTags;
        }
        set parentTags(value) {
            this._parentTags = value;
        }
        set showSaveBtn(value) {
            this._showSaveBtn = value;
        }
        get showSaveBtn() {
            return this._showSaveBtn;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.currentId = 0;
            this._data = [];
            this._direction = false;
            this._showSaveBtn = true;
            this.totalPage = 0;
            this.pageNumber = 0;
            this.itemStart = 0;
            this.itemEnd = pageSize;
            this.onSaveConfigData = null;
            this.updateFormStyle = () => {
                if (!this.pnlTabs)
                    return;
                if (this.direction) {
                    this.pnlTabs.classList.add('is-direction');
                }
                else {
                    this.pnlTabs.classList.remove('is-direction');
                }
            };
            this.onSelectIndex = () => {
                const pageNumber = this.paginationElm.currentPage;
                this.pageNumber = pageNumber;
                this.itemStart = (pageNumber - 1) * pageSize;
                this.itemEnd = this.itemStart + pageSize;
                this.renderComponents();
            };
            this.resetPaging = () => {
                this.pageNumber = 1;
                this.itemStart = 0;
                this.itemEnd = this.itemStart + pageSize;
                if (this.paginationElm) {
                    this.paginationElm.currentPage = 1;
                    this.renderComponents();
                }
            };
            this.renderComponents = () => {
                let nodes = [];
                this.totalPage = Math.ceil(this.componentsData.length / pageSize);
                this.paginationElm.visible = this.totalPage > 1;
                if (!this.componentsDataPagination.length) {
                    this.hStackComponents.clearInnerHTML();
                    this.hStackComponents.appendChild(this.$render("i-label", { caption: "No components", margin: { top: 'auto', bottom: 'auto' } }));
                    return;
                }
                for (const item of this.componentsDataPagination) {
                    const pnl = new components_3.Panel(undefined, {
                        width: 'calc(33.33% - 7px)',
                        minWidth: 200,
                        minHeight: 100,
                        border: { radius: 8, width: 1, style: 'solid', color: Theme.text.primary },
                        padding: { top: 10, bottom: 10, left: 10, right: 10 }
                    });
                    pnl.classList.add('pointer');
                    pnl.onClick = () => this.showDetail(item);
                    const vStack = new components_3.VStack(pnl, {
                        gap: 10,
                        verticalAlignment: 'center',
                        horizontalAlignment: 'center',
                        margin: { top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }
                    });
                    const lbTitle = new components_3.Label(vStack, { caption: item.title, font: { size: '16px' } });
                    lbTitle.classList.add('text-capitalize', 'text-center');
                    if (item.description) {
                        const lbDesc = new components_3.Label(vStack, { caption: item.description });
                        lbDesc.classList.add('text-capitalize', 'text-center');
                    }
                    nodes.push(pnl);
                }
                this.hStackComponents.clearInnerHTML();
                this.hStackComponents.append(...nodes);
            };
            this.onSearch = () => {
                this.resetPaging();
            };
            this.closeDetail = () => {
                this.mdSettings.visible = false;
                this.pnlPreview.clearInnerHTML();
            };
            this.showDetail = async (item) => {
                this.currentId = item.id;
                this.item = item;
                let path = item.path;
                if (!path) {
                    path = this.data.find(f => f.id == this.currentId).path;
                }
                this.currentPath = path;
                const containerModule = await (0, index_1.getComponent)(path);
                this.pnlPreview.clearInnerHTML();
                this.pnlPreview.appendChild(this.$render("i-label", { caption: "Preview", font: { size: '16px', bold: true }, margin: { bottom: 10 } }));
                this.pnlPreview.appendChild(containerModule);
                await containerModule.ready();
                if (containerModule === null || containerModule === void 0 ? void 0 : containerModule.getConfigurators) {
                    const configurator = containerModule.getConfigurators().find((configurator) => configurator.target === "Builders");
                    if (configurator === null || configurator === void 0 ? void 0 : configurator.setData) {
                        await configurator.setData(item.properties);
                    }
                    if ((configurator === null || configurator === void 0 ? void 0 : configurator.setTag) && (item.tag || this.parentTags)) {
                        await configurator.setTag(Object.assign(Object.assign({}, this.parentTags), item.tag));
                    }
                    this.renderSettings(configurator, item);
                }
                else {
                    this.builderTarget = null;
                    this.pnlTabs.clearInnerHTML();
                }
                this.mdSettings.visible = true;
            };
            this.onChange = (result, data, action) => {
                if (result) {
                    const commandIns = action.command(action, data);
                    index_1.commandHistory.execute(commandIns);
                }
                else if (data === null || data === void 0 ? void 0 : data.errors) {
                    console.log(data.errors);
                }
            };
            this.onSave = async () => {
                var _a, _b;
                const data = ((_a = this.builderTarget) === null || _a === void 0 ? void 0 : _a.getData) ? await this.builderTarget.getData() : this.item.properties;
                const tag = ((_b = this.builderTarget) === null || _b === void 0 ? void 0 : _b.getTag) ? await this.builderTarget.getTag() : this.item.tag;
                if (this.direction)
                    this.mdSettings.visible = false;
                if (this.onSaveConfigData) {
                    this.onSaveConfigData({
                        path: this.currentPath,
                        properties: Object.assign({ componentId: Number(this.currentId) }, data),
                        tag
                    });
                }
                ;
            };
            this.onConfirm = async (result, data, action) => {
                var _a, _b;
                if (result) {
                    const commandIns = action.command(action, data);
                    index_1.commandHistory.execute(commandIns);
                }
                else if (data === null || data === void 0 ? void 0 : data.errors) {
                    console.log(data.errors);
                }
                // confirm btn handle confirm & save if no save btn
                if (!this._showSaveBtn) {
                    const builderTargetData = ((_a = this.builderTarget) === null || _a === void 0 ? void 0 : _a.getData) ? await this.builderTarget.getData() : this.item.properties;
                    const tag = ((_b = this.builderTarget) === null || _b === void 0 ? void 0 : _b.getTag) ? await this.builderTarget.getTag() : this.item.tag;
                    if (this.direction)
                        this.mdSettings.visible = false;
                    if (this.onSaveConfigData) {
                        this.onSaveConfigData({
                            path: this.currentPath,
                            properties: Object.assign({ componentId: Number(this.currentId) }, builderTargetData),
                            tag
                        });
                    }
                    ;
                }
            };
            this.renderTab = (tabs, target, data, title) => {
                if (target) {
                    const opt = {
                        jsonSchema: target.userInputDataSchema,
                        jsonUISchema: target.userInputUISchema,
                        data: data
                    };
                    const tab = new components_3.Panel();
                    tab.classList.add('custom-settings--ui');
                    tabs.add({ caption: title, icon: target.icon ? { name: target.icon, fill: Theme.colors.primary.contrastText } : undefined, children: tab });
                    if (target.customUI) {
                        const element = target.customUI.render(Object.assign({}, data), (result, data) => this.onConfirm(result, data, target));
                        tab.append(element);
                    }
                    else {
                        const self = this;
                        const form = new components_3.Form();
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
                                    self.onConfirm(true, data, target);
                                },
                            },
                            onChange: async () => {
                                const data = await form.getFormData();
                                self.onChange(true, data, target);
                            },
                            dateTimeFormat: {
                                date: 'YYYY-MM-DD',
                                time: 'HH:mm:ss',
                                dateTime: 'MM/DD/YYYY HH:mm'
                            }
                        };
                        form.renderForm();
                        form.clearFormData();
                        form.setFormData(Object.assign({}, data));
                    }
                }
            };
            this.renderSettings = async (builderTarget, item) => {
                this.builderTarget = builderTarget;
                const data = (builderTarget === null || builderTarget === void 0 ? void 0 : builderTarget.getData) ? await builderTarget.getData() : item.properties;
                const tag = (builderTarget === null || builderTarget === void 0 ? void 0 : builderTarget.getTag) ? await builderTarget.getTag() : item.tag;
                const actions = (builderTarget === null || builderTarget === void 0 ? void 0 : builderTarget.getActions()) || [];
                const general = actions.find((v) => ['Settings', 'General'].includes(v.name));
                const commissions = actions.find((v) => ['Commissions'].includes(v.name));
                const theme = actions.find((v) => ['Theme Settings', 'Theme'].includes(v.name));
                const advanced = actions.find((v) => ['Advanced'].includes(v.name));
                const tabs = await components_3.Tabs.create();
                this.pnlTabs.clearInnerHTML();
                this.pnlTabs.appendChild(tabs);
                this.renderTab(tabs, general, data, 'General');
                this.renderTab(tabs, commissions, data, 'Commissions');
                this.renderTab(tabs, theme, tag, 'Theme');
                this.renderTab(tabs, advanced, data, 'Advanced');
                tabs.activeTabIndex = 0;
            };
        }
        get componentsData() {
            const searchVal = (this.inputSearch.value || '').toLowerCase();
            if (!searchVal)
                return this.data;
            return this.data.filter(v => { var _a; return v.title.toLowerCase().includes(searchVal) || ((_a = v.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchVal)); });
        }
        get componentsDataPagination() {
            return this.componentsData.slice(this.itemStart, this.itemEnd);
        }
        async init() {
            super.init();
            this.updateFormStyle();
            this.renderComponents();
        }
        render() {
            return (this.$render("i-vstack", { gap: 8, padding: { top: '1rem', bottom: '1rem' }, class: index_css_1.configStyle },
                this.$render("i-input", { id: "inputSearch", width: 300, maxWidth: "100%", height: 32, border: { radius: 5, style: 'solid', width: 1, color: Theme.text.primary }, placeholder: "Search components", onChanged: this.onSearch }),
                this.$render("i-hstack", { id: "hStackComponents", minHeight: 120, gap: 10, wrap: "wrap", horizontalAlignment: "center" }),
                this.$render("i-pagination", { id: "paginationElm", margin: { top: 16, bottom: 16, left: 'auto', right: 'auto' }, width: "auto", currentPage: this.pageNumber, totalPages: this.totalPage, onPageChanged: this.onSelectIndex }),
                this.$render("i-modal", { id: "mdSettings", width: 1300 },
                    this.$render("i-hstack", { gap: 20, horizontalAlignment: "end" },
                        this.$render("i-icon", { width: 20, height: 20, class: "pointer icon-close", name: "times", fill: Theme.colors.primary.main, onClick: this.closeDetail })),
                    this.$render("i-hstack", { gap: 20, padding: { top: 20, bottom: 20, left: 20, right: 20 }, minHeight: "70vh", horizontalAlignment: "center", wrap: "wrap" },
                        this.$render("i-panel", { id: "pnlPreview", width: "calc(50% - 21px)", minWidth: 400 }),
                        this.$render("i-panel", { display: "flex", width: 2, background: { color: Theme.divider }, class: "custom--divider" }),
                        this.$render("i-vstack", { gap: 10, width: "calc(50% - 21px)", minWidth: 400 },
                            this.$render("i-label", { caption: "Settings", font: { size: '16px', bold: true } }),
                            this.$render("i-panel", { id: "pnlTabs", width: "100%" }),
                            this.$render("i-button", { id: "btnSave", caption: "Save", visible: this._showSaveBtn, width: 200, margin: { left: 'auto', right: 'auto' }, padding: { top: 8, bottom: 8 }, font: { color: Theme.colors.primary.contrastText }, onClick: this.onSave }))))));
        }
    };
    __decorate([
        (0, components_3.observable)()
    ], ConfiguratorSettings.prototype, "totalPage", void 0);
    ConfiguratorSettings = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-configurator-settings')
    ], ConfiguratorSettings);
    exports.default = ConfiguratorSettings;
});
