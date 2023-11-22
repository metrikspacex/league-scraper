import { model, Schema } from "mongoose";

const AccountSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      unique: false,
    },
    username: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    methods: {},
    query: {
      byEmail(email: string) {
        return this.where({ email });
      },
      byUsername(username: string) {
        return this.where({ username });
      },
    },
    statics: {},
  }
);
const AccountModel = model("Account", AccountSchema);
export { AccountModel };
