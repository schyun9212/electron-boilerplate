import "./styles/global.scss";

import Router from "./Router.svelte";

const app = new Router({
  target: document.getElementById("app")!,
});

export default app;
