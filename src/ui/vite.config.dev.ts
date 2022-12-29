import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // TODO: Determine how to handle

  return {
    plugins: [sveltekit()],
    base: "./",
    root: __dirname + "/src",
    publicDir: "./public",
  };
});
