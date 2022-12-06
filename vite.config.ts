import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);

  return {
    plugins: [svelte()],
    root: "./src/ui",
    resolve: {
      alias: [
        {
          find: "@views",
          replacement: path.resolve(__dirname, "./src/ui/views"),
        },
      ],
    },
    build: {
      outDir: "../../dist",
      rollupOptions: {
        input: ["./src/ui/views/main/index.html"],
      },
    },
  };
});
