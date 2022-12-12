/**
 * [Warning] Experimental implementations
 */

import { BrowserView } from "electron";

export type IBrowserViewBounds = Pick<BrowserView, "getBounds" | "setBounds">;

/**
 * Temporary class to represent nested BrowserView
 * This object handles positional relationship among BrowserViews
 */
export abstract class ViewLayout implements IBrowserViewBounds {
  protected _bounds: Electron.Rectangle;

  constructor(bounds?: Electron.Rectangle) {
    if (bounds) this._bounds = bounds;
  }

  getBounds(): Electron.Rectangle {
    return this._bounds;
  }

  setBounds(bounds: Electron.Rectangle): void {
    this._bounds = bounds;
  }

  abstract getViews(): BrowserView[];

  protected abstract _layout(): void;
  protected _registerListeners(): void {}
}
