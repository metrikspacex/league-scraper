import { model, Schema } from "mongoose";

const VersionSchema = new Schema(
  {
    version: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    methods: {},
    query: {},
    statics: {},
  }
);
const VersionModel = model("Version", VersionSchema);
export { VersionModel };
