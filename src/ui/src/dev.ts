import "./styles/global.scss";

import Main from "./Router.svelte";

const app = new Main({
  target: document.getElementById("app")!,
});

export default app;
