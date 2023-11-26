import { model, Schema } from "mongoose";

const LanguageSchema = new Schema(
  {
    language: {
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
const LanguageModel = model("Language", LanguageSchema);
export { LanguageModel };
