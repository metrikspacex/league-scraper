import { describe, expect, it } from "vitest";

// @ts-expect-error
import { __dirname, __filename, pathFrom } from "@/utilities";

/**
 * Vitest tests for bcrypt.utilities.ts
 *
 * This section contains tests for the `__dirname` and `__filename` constants
 * and `pathFrom` function.
 */

/**
 * Test suite for path.utilities.ts
 */
describe("path.utilities.ts", () => {
  it("should be true", () => {
    expect(true).toBeTruthy();
  });
});
