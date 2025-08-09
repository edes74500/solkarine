import { UserDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const userSchema = new Schema<UserDB>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    roleIds: [{ type: String, ref: "Role" }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.plugin(mongooseLeanVirtuals);

userSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const User = model<UserDB>("User", userSchema);
