import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { readdirSync, existsSync } from "fs";

const OUTPUT_DIR = "../../dist/app-file/ui";

function getEntrypoints(filter?: string[]): string[] {
  const viewDir = `${__dirname}/src/views`;

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
    base: "./",
    publicDir: "public",
    root: __dirname,
    build: {
      outDir: OUTPUT_DIR,
      rollupOptions: {
        input: getEntrypoints(),
      },
    },
  };
});
