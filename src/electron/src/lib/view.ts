import {
  BrowserView,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from "electron";

/**
 * TODO
 *
 * 1. Determine the most suitable name not to be confusing with classes in Electron.js
 *
 */

// TODO
// 1. Determine how to handle inheritance of webPreference
// 2. Determine whether we should have some manager to handle UI tree for modulization
// 3. Determine propagation policy for events as Component has children e.g. setBounds, ...
// 4. Is it possible to use View as Function Component in React..?
// 5. Implement APIs to bridge View with BrowserView
export abstract class View {
  // Extending BrowserView is blocked by policy
  private readonly _browserView: BrowserView;

  // TODO: Make structure of children to heap for search optimization
  protected readonly _children: View[] = [];

  // TODO: Determine how to handle initialization of properties in custom Views
  constructor(
    public parent: View | null,
    options?: Electron.BrowserViewConstructorOptions
  ) {
    if (parent) parent.addChildView(this);
    this._browserView = new BrowserView(options);
  }

  get children() {
    return this._children;
  }

  get browserView() {
    return this._browserView;
  }

  get webContents() {
    return this._browserView.webContents;
  }

  get name() {
    return this.constructor.name;
  }

  // TODO
  // 1. Determine how to handle bounds.
  // e.g. absolte or relative to parent
  // 2. Determine how to manage children (insert, delete, modify, search, ...)
  addChildView(view: View) {
    view.parent = this;
    this._children.push(view);
  }

  getBounds(): Electron.Rectangle {
    return this._browserView.getBounds();
  }

  setBounds(bounds: Electron.Rectangle): void {
    this._browserView.setBounds(bounds);
  }

  setBackgroundColor(color: string): void {
    this._browserView.setBackgroundColor(color);
  }

  setAutoResize(options: Electron.AutoResizeOptions): void {
    this._browserView.setAutoResize(options);
  }

  // This method will be called whenever bounds is updated
  abstract render(): void;
}

// TODO
// 1. Implement APIs to bridge Window with BrowserWindow
export class Window {
  private _rootView: View | undefined;
  // Extending BrowserWindow is blocked by policy
  private readonly _browserWindow: BrowserWindow;

  constructor(options?: BrowserWindowConstructorOptions) {
    this._browserWindow = new BrowserWindow(options);
  }

  get browserWindow() {
    return this._browserWindow;
  }

  get webContents() {
    return this._browserWindow.webContents;
  }

  setView(view: View): void {
    this._rootView = view;
    this._addView(view);
  }

  render() {
    if (!this._rootView) return;

    const { height: windowHeight } = this.getBounds();
    const { width: contentWidth, height: contentHeight } =
      this.getContentBounds();

    const yOffset = windowHeight - contentHeight;

    this._rootView.setBounds({
      x: 0,
      y: yOffset,
      width: contentWidth,
      height: contentHeight,
    });

    this._rootView.render();
  }

  private _addView(view: View): void {
    this._browserWindow.addBrowserView(view.browserView);
    view.children.forEach((v) => this._addView(v));
  }

  private _removeView(view: View): void {
    view.children.forEach((v) => this._removeView(v));
    this._browserWindow.removeBrowserView(view.browserView);
  }

  getBounds() {
    return this._browserWindow.getBounds();
  }

  getContentBounds() {
    return this._browserWindow.getContentBounds();
  }

  getContentSize() {
    return this._browserWindow.getContentSize();
  }
}
