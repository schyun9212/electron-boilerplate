import "../../lib/styles/global.scss";

import Main from "./+layout.svelte";

const app = new Main({
  target: document.getElementById("app")!,
});

export default app;
