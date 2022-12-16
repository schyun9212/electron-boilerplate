import { View } from "../../lib/view";

export class SidebarView extends View {
  render(): void {
    // this.webContents.loadURL("");
  }
}

export class MainView extends View {
  sidebarView: SidebarView;
  contentsView: SidebarView;

  // Remove this uncomforatble usage with factory pattern to instantiate View conditionally.
  constructor(
    parent: View | null,
    options?: Electron.BrowserViewConstructorOptions
  ) {
    super(parent, options);

    this.sidebarView = new SidebarView(this);
    this.contentsView = new SidebarView(this);
  }

  render(): void {
    const { x, y, width, height } = this.getBounds();
    this.sidebarView.setBounds({ x, y, width: 300, height });
    this.sidebarView.setBackgroundColor("#FF0000");

    this.contentsView.setBounds({ x: x + 300, y, width: width - 100, height });
    this.contentsView.setBackgroundColor("#0000FF");
  }
}
