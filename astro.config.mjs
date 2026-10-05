import { defineConfig } from "astro/config";

// User site georgeotjg.github.io → no base path.
// GitHub Pages serves main:/docs, so the build goes straight there.
export default defineConfig({
  site: "https://georgeotjg.github.io",
  output: "static",
  outDir: "./docs",
});
