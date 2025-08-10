import { DungeonDb } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const dungeonSchema = new Schema<DungeonDb>(
  {
    challenge_mode_id: { type: Number, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    keystone_timer_seconds: { type: Number, required: true },
    icon_url: { type: String, required: true },
    background_image_url: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "dungeons",
  },
);

dungeonSchema.plugin(mongooseLeanVirtuals);

dungeonSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Dungeon = model<DungeonDb>("dungeons", dungeonSchema);
