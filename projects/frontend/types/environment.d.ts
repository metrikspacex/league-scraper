/// <reference types="vite/client" />
/// <reference types="vitest/importMeta" />

interface ImportMetaEnv {
  readonly LEAGUE_SCRAPER_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly vitest?: typeof import("vitest");
}
