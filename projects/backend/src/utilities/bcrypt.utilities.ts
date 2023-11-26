import bcrypt from "bcrypt";

/**
 * bcrypt.utilities.ts
 *
 * This module provides utility functions for password hashing and
 * checking using bcrypt.
 */

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - A promise that resolves to true if the
 * passwords match, false otherwise.
 */
async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Hashes a plain text password.
 *
 * @param {string} password - The plain text password.
 * @param {number} saltRounds - The salt to be used in encryption.
 * @default 10
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
async function hashPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export { checkPassword, hashPassword };
