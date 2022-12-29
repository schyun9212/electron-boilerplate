import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // TODO: Determine how to handle

  return {
    plugins: [react()],
    base: "./",
    publicDir: "public",
    root: __dirname + "/src",
  };
});
