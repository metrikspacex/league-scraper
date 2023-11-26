import { describe, expect, it, vi } from "vitest";

import { validateEmail, validatePassword, validateUsername } from "@/utilities";

/**
 * Vitest tests for validate.utilities.ts
 *
 * This section contains tests for the `validateEmail`, `validatePassword`,
 * `validateUsername` functions.
 */

/**
 * Test suite for validate.utilities.ts
 */

describe("validate.utilities.ts", () => {
  vi.mock("@/models", async () => {
    const fakeStorage = [
      {
        email: "dustin1818@gmail.com",
        username: "dustin1818",
      },
      {
        email: "metrikspacex@gmail.com",
        username: "metrikspacex",
      },
    ];

    const AccountModel = {
      exists: async (query: { email: string; username: string }) => {
        if (query.email) {
          return fakeStorage.some(({ email }) => email === query.email);
        } else if (query.username) {
          return fakeStorage.some(
            ({ username }) => username === query.username
          );
        }
        // Never makes it here
        console.log("Invalid query");
        return false;
      },
      fakeStorage,
    };

    return { AccountModel };
  });

  /**
   * Test for `validateEmail` function.
   *
   * This test checks that `validateEmail` correctly validates an email.
   * It checks the following cases:
   * - The case where the email is not a string.
   * - The case where the email is invalid.
   * - The case where the email exists.
   * - The case where the email doesn't exists.
   */
  it("validateEmail", async () => {
    await expect(validateEmail(123)).rejects.toThrow(
      new Error(`Email: ${123} is not string`)
    );

    await expect(validateEmail("metrikspacex@")).rejects.toThrow(
      new Error(`Email: ${"metrikspacex@"} is invalid`)
    );

    await expect(validateEmail("1234@gmail.com")).resolves.not.toThrow(
      new Error(`Email: ${"1234@gmail.com"} exists`)
    );

    await expect(validateEmail("dustin1818@gmail.com")).rejects.toThrow(
      new RegExp(
        `Record exists on .* with query: \\{"email":"${"dustin1818@gmail.com"}"\\}`,
        "u"
      )
    );

    await expect(validateEmail("metrikspacex@gmail.com")).rejects.toThrow(
      new RegExp(
        `Record exists on .* with query: \\{"email":"${"metrikspacex@gmail.com"}"\\}`,
        "u"
      )
    );

    await expect(validateEmail("m3taeyd3a@gmail.com")).resolves.not.toThrow(
      new RegExp(
        `Record exists on .* with query: \\{"email":"${"m3taeyd3a@gmail.com"}"\\}`,
        "u"
      )
    );
  });

  /**
   * Test for `validatePassword` function.
   *
   * This test checks that `validatePassword` correctly validates a password.
   * It checks the following cases:
   * - The case where the password is not a string.
   * - The case where the password is too short.
   * - The case where the password valid.
   */
  it("validatePassword", async () => {
    await expect(validatePassword(123)).rejects.toThrow(
      new Error("Password is not string")
    );

    await expect(validatePassword("1234567")).rejects.toThrow(
      new Error("Password is too short")
    );

    await expect(validatePassword("12345678")).resolves.not.toThrow(
      new Error("Password is too short")
    );
  });

  /**
   * Test for `validateUsername` function.
   *
   * This test checks that `validateUsername` correctly validates a username.
   * It checks the following cases:
   * - The case where the username is not a string.
   * - The case where the username is too short.
   * - The case where the username it exists.
   * - The case where the username it doesn't exist.
   */
  it("validateUsername", async () => {
    await expect(validateUsername(123)).rejects.toThrow(
      new Error(`Username: ${123} is not string`)
    );

    await expect(validateUsername("123")).rejects.toThrow(
      new Error(`Username: ${123} is too short`)
    );

    await expect(validateUsername("1234")).resolves.not.toThrow(
      new Error(`Username: ${1234} is too short`)
    );

    await expect(validateUsername("dustin1818")).rejects.toThrow(
      new RegExp(
        `Record exists on .* with query: \\{"username":"${"dustin1818"}"\\}`,
        "u"
      )
    );

    await expect(validateUsername("metrikspacex")).rejects.toThrow(
      new RegExp(
        `Record exists on .* with query: \\{"username":"${"metrikspacex"}"\\}`,
        "u"
      )
    );

    await expect(validateUsername("eyd3a")).resolves.not.toThrow(
      new Error(`Username: ${"eyd3a"} exists`)
    );
  });
});
