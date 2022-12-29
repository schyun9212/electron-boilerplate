/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    files: {
      routes: process.cwd() + "/src/views",
      appTemplate: process.cwd() + "/src/dev.html",
    },
  },
};

export default config;
