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

    // this._mainWindow.webContents.loadURL("https://www.naver.com");

    this._view = new MainView(null);
    this._view.setBounds({ x: 0, y: 36, width: 100, height: 100 });
    this._mainWindow.setView(this._view);
    this._mainWindow.render();

    // this._mainWindow.loadURL("https://www.naver.com");
    // console.log(`${__dirname}/../../ui/views/main/index.html`);
    // this._mainWindow.loadURL(
    //   `file://${__dirname}/../../ui/views/main/index.html`
    // );
    // this._mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  private _onError(e: Error) {}
}
