import { app, BrowserWindow } from "electron";

function createWindow() {
  const win = new BrowserWindow({
    // resizable: true,
    width: 1280,
    height: 720,
    webPreferences: {
      webSecurity: true,
    },
  });

  return win;
}

export class MainApplication {
  private _mainWindow: Electron.BrowserWindow;

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

    app.whenReady().then(() => {
      this._mainWindow = createWindow();
      // this._mainWindow.loadURL("https://www.naver.com");
      console.log(`${__dirname}/../../ui/views/main/index.html`);
      this._mainWindow.loadURL(
        `file://${__dirname}/../../ui/views/main/index.html`
      );
      this._mainWindow.webContents.openDevTools({ mode: "detach" });
    });
  }

  private _initViews() {}
  private _initServices() {}

  private _registerListeners() {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (!this._mainWindow) {
        this._mainWindow = createWindow();
      }
    });
  }

  private _onError(e: Error) {}
}
