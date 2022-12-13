import { BrowserWindow } from "electron";

export abstract class LayoutManager {
  protected _bounds: Electron.Rectangle;

  public setBounds(bounds: Electron.Rectangle) {
    this._bounds = bounds;
  }

  public getBounds(): Electron.Rectangle {
    return this._bounds;
  }
}

export abstract class Layout extends LayoutManager {
  public abstract init(): void;
}

export abstract class View extends LayoutManager {
  protected _layout: Layout;
  protected _registerListeners(): void {}

  public setBounds(bounds: Electron.Rectangle) {
    super.setBounds(bounds);

    this._layout.setBounds(bounds);
    this._layout.init();
  }

  public abstract destroy(): void;
}

export class ViewContainer extends LayoutManager {
  constructor(private _view: View, _bounds?: Electron.Rectangle) {
    super();

    this.setBounds(_bounds ?? _view.getBounds());
  }

  public setView(view: View) {
    this._view.destroy();
    view.setBounds(this._bounds);
    this._view = view;
  }

  public getView(): View {
    return this._view;
  }

  public setBounds(bounds: Electron.Rectangle) {
    this._bounds = bounds;
    this._view.setBounds(bounds);
  }

  public getBounds(): Electron.Rectangle {
    return this._bounds;
  }

  public destory(): void {
    this._view.destroy();
  }
}
