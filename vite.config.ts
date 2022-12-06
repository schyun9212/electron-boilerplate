import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const UI_WORKSPACE = "./src/ui";
const OUTPUT_DIR = "../../dist"; /* Relative to UI_WORKSPACE */

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);

  return {
    plugins: [svelte()],
    root: UI_WORKSPACE,
    build: {
      outDir: OUTPUT_DIR,
      rollupOptions: {
        input: [
          `${UI_WORKSPACE}/views/main/index.html`,
          `${UI_WORKSPACE}/views/sidebar/index.html`,
        ],
      },
    },
  };
});
