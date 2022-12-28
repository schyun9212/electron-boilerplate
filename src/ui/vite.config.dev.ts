import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // TODO: Determine how to handle

  return {
    plugins: [svelte()],
    base: "./",
    root: __dirname + "/src",
    publicDir: "./public",
    server: {
      open: "dev.html",
    },
  };
});
