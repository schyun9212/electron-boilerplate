import { app, BrowserView, BrowserWindow } from "electron";
import { View, Window } from "./lib/view";
import { MainView } from "./view/main/mainView";

export class MainApplication {
  private _mainWindow: Window | undefined;
  private _view: MainView | undefined;

  // private _services: Record<string, Object>;

  constructor() {}

  public run() {
    try {
      this._startup();
    } catch (e) {
      this._onError(e);
    }
  }

  private _startup() {
    this._registerListeners();
    app.whenReady().then(() => this._onReady());
  }

  private _initServices() {}

  private _registerListeners() {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (!this._mainWindow) {
        this._onReady();
      }
    });
  }

  private _onReady() {
    this._mainWindow = new Window({ width: 1280, height: 720 });

    this._view = new MainView(null);
    this._mainWindow.setView(this._view);
    this._mainWindow.render();
  }

  private _onError(e: Error) {}
}
