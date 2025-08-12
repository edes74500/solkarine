import { AddonProfileDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const addonProfileSchema = new Schema<AddonProfileDB>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    addon_id: { type: mongoose.Schema.Types.ObjectId, ref: "Addon", required: true } as any,
    screenshots: { type: [String], required: true, default: [] },
    export_string: { type: String, required: true },
    info: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

addonProfileSchema.plugin(mongooseLeanVirtuals);
addonProfileSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const AddonProfile = model<AddonProfileDB>("AddonProfile", addonProfileSchema);
