import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ViewRouter } from "./ViewRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewRouter />
  </StrictMode>
);
