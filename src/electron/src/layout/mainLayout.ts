import { Layout, View, ViewContainer } from "../lib/view";

class MainLayout extends Layout {
  private _sidebar: View;
  private _content: View;

  constructor(protected _bounds: Electron.Rectangle) {
    super();

    this._sidebar = new ViewContainer(sidebarView);
    this._content = new ViewContainer(contentView);
  }

  init() {
    // this._sidebarContainer.setBounds({ x: 0, y: 0, width: 100, height: 100 });
    // this._contentContainer.setBounds({ x: 100, y: 0, width: 100, height: 100 });
  }

  // setContentView(view: View) {
  // this._contentContainer.setView(view);
  // }
}

export class MainView extends View {
  constructor() {
    super();

    this._layout = new MainLayout({ x: 0, y: 0, width: 100, height: 100 });

    this._layout.init();
  }

  public destory(): void {}
}
