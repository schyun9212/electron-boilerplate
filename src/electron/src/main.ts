import "./bootstrap";

import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow;

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

app.whenReady().then(() => {
  mainWindow = createWindow();

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
});
