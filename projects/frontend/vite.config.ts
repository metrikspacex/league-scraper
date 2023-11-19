/// <reference types="vitest/config" />
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// TODO: Finish setting up vitest
export default defineConfig(({ mode }) => {
  const { LEAGUE_SCRAPER_API } = loadEnv(
    mode,
    resolve(process.cwd(), "./environments/"),
    ""
  );

  return {
    appType: "spa",
    base: "/",
    build: {
      assetsDir: "./src/assets/",
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: false,
      minify: false,
      outDir: "../../dist/frontend",
      rollupOptions: {
        output: {
          assetFileNames: (_chunkInfo) => {
            return "assets/[name].[ext]";
          },
          chunkFileNames: (_chunkInfo) => {
            return "assets/[name].js";
          },
          entryFileNames: (_chunkInfo) => {
            return "assets/[name].js";
          },
        },
      },
      sourcemap: false,
      target: "es2020",
      write: true,
    },
    clearScreen: false,
    envDir: "./environments/",
    envPrefix: "LEAGUE_SCRAPER_",
    esbuild: {},
    plugins: [react()],
    preview: {
      port: 5173,
      strictPort: true,
    },
    publicDir: "./public",
    resolve: {
      alias: [
        {
          find: "@/assets",
          replacement: fileURLToPath(new URL("src/assets/", import.meta.url)),
        },
        {
          find: "@/components",
          replacement: fileURLToPath(
            new URL("src/components/", import.meta.url)
          ),
        },
        {
          find: "@/pages",
          replacement: fileURLToPath(new URL("src/pages/", import.meta.url)),
        },
        {
          find: "@/routes",
          replacement: fileURLToPath(new URL("src/routes/", import.meta.url)),
        },
        {
          find: "@/src",
          replacement: fileURLToPath(new URL("src", import.meta.url)),
        },
        {
          find: "@/styles",
          replacement: fileURLToPath(new URL("src/styles/", import.meta.url)),
        },
      ],
    },
    root: ".",
    server: {
      host: true,
      port: 5173,
      proxy: {
        "/api": {
          changeOrigin: true,
          // TODO: Fix this
          //rewrite: (path) => path.replace(/^\/api/v, ""),
          target: LEAGUE_SCRAPER_API,
        },
      },
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    test: {
      alias: [
        {
          find: "@/assets",
          replacement: fileURLToPath(new URL("src/assets/", import.meta.url)),
        },
        {
          find: "@/components",
          replacement: fileURLToPath(
            new URL("src/components/", import.meta.url)
          ),
        },
        {
          find: "@/pages",
          replacement: fileURLToPath(new URL("src/pages/", import.meta.url)),
        },
        {
          find: "@/routes",
          replacement: fileURLToPath(new URL("src/routes/", import.meta.url)),
        },
        {
          find: "@/src",
          replacement: fileURLToPath(new URL("src", import.meta.url)),
        },
        {
          find: "@/styles",
          replacement: fileURLToPath(new URL("src/styles/", import.meta.url)),
        },
      ],
      clearMocks: true,
      css: true,
      dir: "./tests/",
      environment: "jsdom",
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      passWithNoTests: true,
    },
  };
});
