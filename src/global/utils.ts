import { application } from "@ijstech/components";

export interface ICommand {
  execute(): any;
  undo(): void;
  redo(): void;
}

export class CommandHistory {
  private commands: ICommand[] = [];
  private currentCommandIndex = -1;

  async execute(command: ICommand): Promise<void> {
    this.commands = this.commands.slice(0, this.currentCommandIndex + 1);
    this.commands.push(command);
    this.currentCommandIndex++;
    await command.execute();
  }

  undo(): void {
    if (this.currentCommandIndex >= 0) {
      const command = this.commands[this.currentCommandIndex];
      console.log('undo', command)
      command.undo();
      this.currentCommandIndex--;
    }
  }

  redo(): void {
    if (this.currentCommandIndex < this.commands.length - 1) {
      this.currentCommandIndex++;
      const command = this.commands[this.currentCommandIndex];
      console.log('redo', command)
      command.execute();
    }
  }
}

export const commandHistory = new CommandHistory();

export const getComponent = async (path: string) => {
  application.currentModuleDir = path;
  await application.loadScript(`${path}/index.js`);
  application.currentModuleDir = '';
  const elementName = `i-${path.split('/').pop()}`;
  const element = document.createElement(elementName);
  return element;
}
