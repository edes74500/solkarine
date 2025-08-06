import { AddonDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const addonSchema = new Schema<AddonDB>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    addonUrl: { type: String, required: true },
    tags: { type: [String], required: true },
    info: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
addonSchema.plugin(mongooseLeanVirtuals);

addonSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Addon = model<AddonDB>("Addon", addonSchema);
