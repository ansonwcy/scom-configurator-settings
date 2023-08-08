import { Container, customModule, Module, Panel } from "@ijstech/components";
import ConfiguratorSettings from '@scom/scom-configurator-settings'

@customModule
export class MainModule extends Module {

  private pnlMain: Panel;

  init() {
    const config = new ConfiguratorSettings();
    this.pnlMain.appendChild(config);
  }

  render() {
    return (
      <i-panel id="pnlMain" width="100%" height="100%">
        
      </i-panel>
    )
  }
}
