import { BrowserView, ipcMain } from "electron";

export class ToolbarView extends BrowserView {
  constructor(options?: Electron.BrowserViewConstructorOptions | undefined) {
    super(options);

    this._registerListener();
  }

  private _registerListener() {
    ipcMain.on("navigate", this._handleNavigate);
  }

  private _handleNavigate(event: Electron.IpcMainEvent, url: string) {
    // ...
  }

  private _handleSuggestion(event: Electron.IpcMainEvent, url: string) {
    // ...
  }

  // handle something...
}
