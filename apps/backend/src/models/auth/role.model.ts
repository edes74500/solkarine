import { RoleDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const roleSchema = new Schema<RoleDB>(
  {
    name: { type: String, required: true },
    permissionsIds: [{ type: String, ref: "Permission" }],
    version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

roleSchema.plugin(mongooseLeanVirtuals);

roleSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Role = model<RoleDB>("Role", roleSchema);
