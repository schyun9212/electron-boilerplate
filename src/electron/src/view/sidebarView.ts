import { BrowserView } from "electron";

export class SidebarView extends BrowserView {
  constructor(options?: Electron.BrowserViewConstructorOptions | undefined) {
    super(options);
  }
}
