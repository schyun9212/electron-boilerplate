import { BrowserView, BrowserWindow } from "electron";

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
export abstract class View extends BrowserView {
  public parent: View | undefined = undefined;

  // TODO: Make structure of children to heap for search optimization
  protected readonly _children: View[] = [];

  // TODO: Determine how to handle initialization of properties in custom Views
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
  addChildView(view: View) {
    view.parent = this;
    this._children.push(view);
  }

  setBounds(bounds: Electron.Rectangle): void {
    super.setBounds(bounds);
    this.render();
  }

  // This method will be called whenever bounds is updated
  abstract render(): void;
}

export class Window extends BrowserWindow {
  addView(view: View): void {
    this.addBrowserView(view);
    view.children().forEach((v) => this.addBrowserView(v));
  }

  removeView(view: View): void {
    view.children().forEach((v) => this.removeView(v));
    this.removeView(view);
  }
}
