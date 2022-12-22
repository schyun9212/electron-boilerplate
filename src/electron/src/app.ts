import { app } from "electron";
import { Window } from "./common/view";
import { FileProtocolService } from "./service/fileProtocolService";
import { MainView } from "./view/main/mainView";

// TODO: Determine how to manage services

export class MainApplication {
  private _mainWindow: Window | undefined;
  private _view: MainView | undefined;

  private _services: Record<string, Object> = {};

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

  private _initServices() {
    const fileProtocolService = new FileProtocolService();
    this._services.fileProtocolService = fileProtocolService;
  }

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
    this._initServices();

    this._mainWindow = new Window({ width: 1280, height: 720 });

    this._view = new MainView(null);
    this._mainWindow.setView(this._view);
    this._mainWindow.render();
  }

  private _onError(e: Error) {}
}
