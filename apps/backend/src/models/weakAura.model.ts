import mongoose, { Schema, model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const weakAuraSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    info: { type: String },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
weakAuraSchema.plugin(mongooseLeanVirtuals);

weakAuraSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

weakAuraSchema.index({ url: 1 }, { unique: true });

export const WeakAura = model("WeakAura", weakAuraSchema);
