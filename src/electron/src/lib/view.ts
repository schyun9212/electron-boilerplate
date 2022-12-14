import { BrowserView, BrowserWindow, Rectangle } from "electron";

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
export class View extends BrowserView {
  public parent: View | undefined = undefined;

  // TODO: Make structure of children to heap for search optimization
  protected readonly _children: View[] = [];

  constructor(options?: Electron.BrowserViewConstructorOptions) {
    super(options);
  }

  children() {
    return this._children;
  }

  // TODO
  // 1. Determine how to handle bounds.
  // e.g. absolte or relative to parent
  // 2. Determine how to manage children (insert, delete, modify, search, ...)
  addChildView(view: View, bounds: Electron.Rectangle) {
    view.setBounds(bounds);
    view.parent = this;
    this._children.push(view);
  }

  setBounds(bounds: Electron.Rectangle): void {
    super.setBounds(bounds);
    this.layout();
  }

  layout() {}
}

export class Window extends BrowserWindow {
  addView(view: View): void {
    this.addBrowserView(view);
    view.children().forEach((v) => this.addBrowserView(v));
  }

  removeComponent(view: View): void {
    view.children().forEach((v) => this.removeComponent(v));
    this.removeComponent(view);
  }
}
