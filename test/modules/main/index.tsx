import { Container, customModule, Module, Panel } from "@ijstech/components";
import ConfiguratorSettings from '@scom/scom-configurator-settings'
import dataJson from './data.json';

@customModule
export class MainModule extends Module {

  private pnlMain: Panel;
  private _data: any= {showHeader: false, showFooter: false};

  private test() {
    const config = new ConfiguratorSettings();
    config.data = dataJson;
    if (this._data.options) {
      config.showDetail({ properties: { ...this._data }, id: this._data.componentId, tag: { ...this.tag } });
    } else if (this.tag) {
      config.parentTags = { ...this.tag };
    }
    // config.onSaveConfigData = (configData) => {
    //   if (configData && onReplace) {
    //     const { path } = configData;
    //     onReplace({
    //       ...configData,
    //       module: {
    //         name: 'Dune Blocks',
    //         path,
    //         category: 'charts'
    //       }
    //     });
    //   }
    // }
    this.pnlMain.append(config);
  }

  render() {
    return (
      <i-panel id="pnlWrapper" width="100%" height="100%" padding={{ top: 5, right: 10, bottom: 5, left: 10 }}>
        <i-button caption={"test"} padding={{ top: 5, right: 5, bottom: 5, left: 5 }} onClick={this.test}></i-button>
        <i-panel id="pnlMain"></i-panel>
      </i-panel>
    )
  }
}
