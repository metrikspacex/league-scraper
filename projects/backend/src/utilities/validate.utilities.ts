import type { Document, FilterQuery, Model } from "mongoose";

import { AccountModel } from "@/models";

/**
 * validate.utilities.ts
 *
 * This module provides utility functions for validating data models.
 */

/**
 * Validates the existence of a record.
 *
 * This function checks if a record exists in the database with the given query.
 * @param {Model<any, any, any>} model - The model to check.
 * @param {FilterQuery<T>} query - The query to check.
 * @throws {Error} - Throws an error if the record exists.
 */
async function validateExistences<T extends Document>(
  model: Model<any, any, any>,
  query: FilterQuery<T>
) {
  const recordExists = await model.exists(query);
  if (recordExists) {
    throw new Error(
      `Record exists on ${model.modelName} with query: ${JSON.stringify(query)}`
    );
  }
}

/**
 * Validates an email.
 *
 * This function checks if the email already exists in the database and if it
 * matches the email format.
 *
 * @param {any} email - The email to validate.
 * @throws {Error} - Throws an error if the email already exists or if it's
 * invalid.
 */
async function validateEmail(email: any) {
  if (typeof email !== "string")
    throw new Error(`Email: ${email} is not string`);

  const emailRegex = /^[\w-]+(?:\.[\w-]+)*(?:@[\w-]+\.)+[A-Za-z]{2,7}$/u;
  if (!emailRegex.test(email)) throw new Error(`Email: ${email} is invalid`);

  await validateExistences(AccountModel, { email });
}

/**
 * Validates a password.
 *
 * This function checks if the password is a string and if it has a minimum
 * length of 8 characters.
 *
 * @param {any} password - The password to validate.
 * @throws {Error} - Throws an error if the password is not a string or if it's
 * too short.
 */
async function validatePassword(password: any) {
  if (typeof password !== "string") throw new Error("Password is not string");
  if (password.length < 8) throw new Error("Password is too short");
  // TODO: Weak passwords
}

/**
 * Validates a username.
 *
 * This function checks if the username already exists in the database and if it
 * matches the username format.
 *
 * @param {any} username - The username to validate.
 * @throws {Error} - Throws an error if the username is not a string or if it's
 * too short.
 */
async function validateUsername(username: any) {
  if (typeof username !== "string")
    throw new Error(`Username: ${username} is not string`);
  if (username.length < 4)
    throw new Error(`Username: ${username} is too short`);
  // TODO: Username regex restrictions

  await validateExistences(AccountModel, { username });
}

export {
  validateEmail,
  validateExistences,
  validatePassword,
  validateUsername,
};
