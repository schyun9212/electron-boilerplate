import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toolbar } from "./Toolbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toolbar />
  </StrictMode>
);
