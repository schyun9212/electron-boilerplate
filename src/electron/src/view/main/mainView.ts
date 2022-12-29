import { View } from "../../common/view";
// import { mainEventManager } from "../../event/mainEventManager";

class ToolbarView extends View {
  render(): void {
    this.webContents.loadURL("app-file://ui/views/toolbar/index.html");
  }

  dispose(): void {}
}

class ContentView extends View {
  render(): void {
    this.webContents.loadURL("app-file://ui/views/main/index.html");
  }

  dispose(): void {}
}

export class MainView extends View {
  sidebarView: ToolbarView;
  contentView: ContentView;

  // Remove this uncomforatble usage with factory pattern to instantiate View conditionally.
  constructor(
    parent: View | null,
    options?: Electron.BrowserViewConstructorOptions
  ) {
    super(parent, options);

    this.sidebarView = new ToolbarView(this);
    this.contentView = new ContentView(this);
  }

  render(): void {
    const { x, y, width, height } = this.getBounds();
    this.sidebarView.setBounds({ x, y, width, height: 24 });
    this.sidebarView.setBackgroundColor("#FF0000");

    this.contentView.setBounds({
      x,
      y: y + 24,
      width: width,
      height: height - 24,
    });
    this.contentView.setBackgroundColor("#0000FF");

    this.contentView.webContents.openDevTools({ mode: "detach" });
  }

  dispose(): void {
    this.sidebarView.dispose();
    this.contentView.dispose();
  }
}
