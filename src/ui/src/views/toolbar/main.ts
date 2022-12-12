import "./Toolbar.scss";
import Toolbar from "./Toolbar.svelte";

const app = new Toolbar({
  target: document.getElementById("app")!,
});

export default app;
