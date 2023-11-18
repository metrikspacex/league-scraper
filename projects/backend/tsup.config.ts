import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/server.ts"],
  env: {},
  format: ["cjs", "esm"],
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  minifyWhitespace: false,
  outDir: "../../dist/backend",
  shims: true,
  sourcemap: true,
  splitting: false,
  target: "node14",
  tsconfig: "tsconfig.json",
});
