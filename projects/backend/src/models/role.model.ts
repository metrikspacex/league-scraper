import { model, Schema } from "mongoose";

const RoleSchema = new Schema({
  role: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
});
const RoleModel = model("Role", RoleSchema);
export { RoleModel, RoleSchema };
