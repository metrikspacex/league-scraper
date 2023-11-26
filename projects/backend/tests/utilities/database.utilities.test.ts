import { describe, expect, it } from "vitest";

import { Database } from "@/utilities";

/**
 * Vitest tests for database.utilities.ts
 *
 * This section contains tests for the `database` Singleton.
 */

/**
 * Test suite for database.utilities.ts
 */
describe("database.utilities.ts", () => {
  /**
   * Test for `database` Singleton.
   *
   * This test checks that the `database` Singleton is correctly implemented.
   * - It checks that the `database` Singleton is correctly implemented.
   */
  it("database singleton implementation", () => {
    const databaseOne = Database.get();
    const databaseTwo = Database.get();
    expect(databaseOne).toBe(databaseTwo);
  });
});
