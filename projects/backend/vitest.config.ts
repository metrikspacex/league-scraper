import { fileURLToPath, URL } from "node:url";

import type { File, TaskResultPack, UserConsoleLog, Vitest } from "vitest";
import { defineConfig } from "vitest/config";
import type { Reporter } from "vitest/reporters";

// @ts-expect-error
class BackendReporter implements Reporter {
  private collectTime = 0;
  private ctx!: Vitest;
  private fileCount = 0;
  private startTime = 0;
  private testCount = 0;
  private testsTime = 0;

  public onCollected(_files?: File[]) {
    this.collectTime = Date.now() - this.startTime;
  }

  public onInit(_ctx: Vitest) {
    this.ctx = _ctx;
    this.startTime = Date.now();
  }

  public onFinished(_files?: File[], _errors?: unknown[]) {
    // Empty
    const duration = Date.now() - this.startTime;

    this.ctx.logger.log("");
    this.ctx.logger.log("..");
    this.ctx.logger.log("");

    this.ctx.logger.log(
      `Test Files  ${this.fileCount} passed (${this.fileCount})`
    );

    this.ctx.logger.log(`Tests  ${this.testCount} passed (${this.testCount})`);

    this.ctx.logger.log(
      `Start at  ${new Date(this.startTime).toLocaleTimeString()}`
    );

    this.ctx.logger.log(
      `Duration  ${duration}ms (collect ${this.collectTime}ms, tests ${this.testsTime}ms)`
    );
  }

  public onPathsCollected(_paths?: string[]) {
    this.fileCount = _paths?.length ?? 0;
  }

  public onProcessTimeout() {
    // Empty
  }

  public onServerRestart(_reason?: string) {
    // Empty
  }

  public onTaskUpdate(packs: TaskResultPack[]) {
    // Empty
    for (const pack of packs) {
      const [_id, result, _meta] = pack;
      if (result && Array.isArray(result)) {
        this.testCount += result.length;
      }
    }
    this.testsTime = Date.now() - this.startTime - this.collectTime;
  }

  public onTestRemoved(_trigger?: string) {
    // Empty
  }

  public onUserConsoleLog(_log: UserConsoleLog) {
    // Empty
  }

  public onWatcherStart(_files?: File[], _errors?: unknown[]) {
    // Empty
  }

  public onWatcherRerun(_files: string[], _trigger?: string) {
    // Empty
  }
}

export default defineConfig({
  test: {
    alias: [
      {
        find: "@/assets/",
        replacement: fileURLToPath(new URL("src/assets/", import.meta.url)),
      },
      {
        find: "@/configs",
        replacement: fileURLToPath(new URL("src/configs", import.meta.url)),
      },
      {
        find: "@/controllers",
        replacement: fileURLToPath(new URL("src/controllers", import.meta.url)),
      },
      {
        find: "@/middlewares",
        replacement: fileURLToPath(new URL("src/middlewares", import.meta.url)),
      },
      {
        find: "@/mocks",
        replacement: fileURLToPath(new URL("tests/mocks", import.meta.url)),
      },
      {
        find: "@/models",
        replacement: fileURLToPath(new URL("src/models", import.meta.url)),
      },
      {
        find: "@/routes",
        replacement: fileURLToPath(new URL("src/routes", import.meta.url)),
      },
      {
        find: "@/services",
        replacement: fileURLToPath(new URL("src/services", import.meta.url)),
      },
      {
        find: "@/types",
        replacement: fileURLToPath(new URL("src/types", import.meta.url)),
      },
      {
        find: "@/utilities",
        replacement: fileURLToPath(new URL("src/utilities", import.meta.url)),
      },
    ],
    allowOnly: true,
    bail: 20,
    cache: false,
    clearMocks: true,
    environment: "node",
    globals: true,
    include: ["./tests/**/*.test.ts"],
    inspect: false,
    inspectBrk: false,
    isolate: true,
    mockReset: true,
    name: "backend",
    reporters: ["default", "hanging-process"],
    restoreMocks: true,
    silent: false,
    testTimeout: 5000,
    threads: true,
    typecheck: {
      allowJs: true,
      checker: "tsc",
      ignoreSourceErrors: false,
      tsconfig: "./tests/tsconfig.json",
    },
    watch: true,
  },
});
