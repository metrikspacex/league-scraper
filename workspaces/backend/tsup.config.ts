import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  bundle: true,
  dts: true,
  entry: ["./src/main.ts"],
  format: ["cjs", "esm"],
  minify: !options.watch,
  outDir: "./dist",
  sourcemap: Boolean(options.watch),
  tsconfig: "./tsconfig.json",
  watch: true,
}));
