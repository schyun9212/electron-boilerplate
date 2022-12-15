import { View } from "../../lib/view";

export class SidebarView extends View {
  render(): void {
    // this.webContents.loadURL("");
  }
}

export class MainView extends View {
  sidebarView: SidebarView;
  contentsView: SidebarView;

  constructor(options?: Electron.BrowserViewConstructorOptions) {
    super(options);

    this.sidebarView = new SidebarView();
    this.contentsView = new SidebarView();
  }

  render(): void {
    const { x, y, width, height } = this.getBounds();
    this.sidebarView.setBounds({ x, y, width: 100, height });
    this.sidebarView.setBackgroundColor("#FF0000");

    this.contentsView.setBounds({ x: x + 100, y, width: width - 100, height });
    this.contentsView.setBackgroundColor("#000");

    this.addChildView(this.sidebarView);
    this.addChildView(this.contentsView);
  }
}
