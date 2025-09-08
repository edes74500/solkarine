import { TalentsDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const talentsSchema = new Schema<TalentsDB>(
  {
    name: { type: String, required: true },
    screenshot: { type: String, required: true },
    info: { type: String },
    class: { type: Number, required: true },
    spec: { type: Number, required: true },
    hero_talent: { type: Number, required: true },
    dungeon_ids: [{ type: Schema.Types.ObjectId, ref: "Dungeon", required: true }],
    // dungeon_ids: { type: [String], required: true },
    export_string: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

talentsSchema.plugin(mongooseLeanVirtuals);

talentsSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Talents = model<TalentsDB>("Talents", talentsSchema);
