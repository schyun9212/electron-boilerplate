import type { Config } from "@sveltejs/kit";

const config: Config = {
  kit: {
    files: {
      routes: "views",
    },
  },
  package: {},
};

export default config;
