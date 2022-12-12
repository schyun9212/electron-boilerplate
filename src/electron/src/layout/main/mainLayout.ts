import { ViewLayout } from "../viewLayout";

class SidebarLayout extends ViewLayout {
  constructor(bounds?: Electron.Rectangle) {
    super(bounds);
  }

  getViews(): Electron.BrowserView[] {
    throw new Error("Method not implemented.");
  }
  protected _layout(): void {
    throw new Error("Method not implemented.");
  }
}

class ContentLayout extends ViewLayout {
  constructor(bounds?: Electron.Rectangle) {
    super(bounds);
  }

  getViews(): Electron.BrowserView[] {
    throw new Error("Method not implemented.");
  }
  protected _layout(): void {
    throw new Error("Method not implemented.");
  }
}

export class MainLayout extends ViewLayout {
  private _sidebar: SidebarLayout;
  private _content: ContentLayout;

  constructor(bounds?: Electron.Rectangle) {
    super(bounds);
  }

  getViews(): Electron.CrossProcessExports.BrowserView[] {
    throw new Error("Method not implemented.");
  }

  protected _layout(): void {
    throw new Error("Method not implemented.");
  }
}
