import { BrowserView, BrowserWindow } from "electron";

export interface LayoutManager {
  setBounds(bounds: Electron.Rectangle);
  getBounds(): Electron.Rectangle;
}

export abstract class Layout implements LayoutManager {
  protected _bounds: Electron.Rectangle;

  public abstract init(): void;

  public setBounds(bounds: Electron.Rectangle) {
    this._bounds = bounds;
  }

  public getBounds(): Electron.Rectangle {
    return this._bounds;
  }
}

export abstract class View implements LayoutManager {
  protected _bounds: Electron.Rectangle;
  protected _registerListeners(): void {}

  public setBounds(bounds: Electron.Rectangle) {
    this._bounds = bounds;
  }

  public getBounds(): Electron.Rectangle {
    return this._bounds;
  }

  public abstract applyLayout(): void;
  public abstract destroy(): void;
}
