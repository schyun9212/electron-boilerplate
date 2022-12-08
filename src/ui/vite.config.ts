import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { readdirSync, lstatSync, existsSync } from "fs";

const UI_WORKSPACE = "./src/ui";
const OUTPUT_DIR = "../../dist"; /* Relative to UI_WORKSPACE */

function getEntrypoints(filter?: string[]): string[] {
  const viewDir = `${UI_WORKSPACE}/views`;

  const entrypoints = readdirSync(viewDir).reduce((prev, v) => {
    if (filter?.length > 0 && !filter.includes(v)) return prev;

    const path = `${viewDir}/${v}/index.html`;
    const isEntryPoint = existsSync(path);
    return isEntryPoint ? [...prev, path] : prev;
  }, [] as string[]);

  return entrypoints;
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // TODO: Determine how to handle

  return {
    plugins: [svelte()],
    root: UI_WORKSPACE,
    build: {
      outDir: OUTPUT_DIR,
      rollupOptions: {
        input: getEntrypoints(),
      },
    },
  };
});
