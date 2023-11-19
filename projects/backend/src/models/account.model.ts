import { Schema } from "mongoose";

import { RoleModel } from ".";

const AccountSchema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
  password: String,
  role: RoleModel,
  updatedAt: Date,
});
export { AccountSchema };
