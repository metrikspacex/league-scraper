import { describe, expect, it } from "vitest";

import { Logger } from "@/utilities";

/**
 * Vitest tests for logger.utilities.ts
 *
 * This section contains tests for the `logger` Singleton.
 */

/**
 * Test suite for logger.utilities.ts
 */
describe("logger.utilities.ts", () => {
  /**
   * Test for `logger` Singleton.
   *
   * This test checks that the `logger` Singleton is correctly implemented.
   * - It checks that the `database` Singleton is correctly implemented.
   */
  it("logger singleton implementation", () => {
    const loggerOne = Logger.get();
    const loggerTwo = Logger.get();
    expect(loggerOne).toBe(loggerTwo);
  });
});
