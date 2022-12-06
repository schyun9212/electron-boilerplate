import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);

  return {
    plugins: [svelte()],
    build: {
      outDir: "dist",
      rollupOptions: {
        input: ["./src/ui/views/main/index.html"],
      },
    },
  };
});
