import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/main.ts"],
  env: {
    DEV: "development",
  },
  format: ["cjs", "esm"],
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  minifyWhitespace: false,
  outDir: "../../dist/backend",
  sourcemap: true,
  splitting: false,
  target: "node14",
  tsconfig: "tsconfig.json",
});
