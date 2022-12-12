import { BrowserView } from "electron";

export class WebContentsView extends BrowserView {
  constructor(options?: Electron.BrowserViewConstructorOptions | undefined) {
    super(options);
  }
}
