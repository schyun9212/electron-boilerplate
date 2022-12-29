import type { Config } from "@sveltejs/kit";

const config: Config = {
  kit: {
    files: {
      routes: "src/views",
    },
  },
};

export default config;
