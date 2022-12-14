import { View } from "../../lib/view";
import { SidebarView } from "./sidebarView";

export class MainView extends View {
  sidebarView: SidebarView;
  contentsView: View;

  layout(): void {
    const bounds = this.getBounds();
  }
}
