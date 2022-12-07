/* @ts-ignore */
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow;

function createWindow() {
  const win = new BrowserWindow({
    // resizable: true,
    width: 1280,
    height: 720,
  });

  return win;
}

app.whenReady().then(() => {
  mainWindow = createWindow();

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    mainWindow = createWindow();
  }
});
