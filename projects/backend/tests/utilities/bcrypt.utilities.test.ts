import { describe, expect, it } from "vitest";

import { checkPassword, hashPassword } from "@/utilities";

/**
 * Vitest tests for bcrypt.utilities.ts
 *
 * This section contains tests for the `checkPassword` and `hashPassword`
 * functions.
 */

/**
 * Test suite for bcrypt.utilities.ts
 */
describe("bcrypt.utilities.ts", () => {
  /**
   * Test for `checkPassword` function.
   *
   * This test checks that `checkPassword` correctly verifies a password.
   * - It checks that the correct password is verified.
   * - It checks that an incorrect password is not verified.
   */
  it("checkPassword", async () => {
    const password = "password";

    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);

    const correct = await checkPassword(password, hashedPassword);
    expect(correct).toBeTruthy();

    const wrong = await checkPassword("wrong password", hashedPassword);
    expect(wrong).not.toBeTruthy();
  });

  /**
   * Test for `hashPassword` function.
   *
   * This test checks that `hashPassword` correctly hashes a password.
   */
  it("hashPassword", async () => {
    const password = "password";

    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });
});
