import { RouteDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const routeSchema = new Schema<RouteDB>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dungeon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dungeon",
      required: true,
    } as any,
    difficulty: { type: Number, required: true },
    speed: { type: Number, required: true },
    key_level: { type: Object, required: true },
    info: { type: String, required: false },
    image: { type: String, required: true },
    lien_mdt: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

routeSchema.plugin(mongooseLeanVirtuals);

routeSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Route = model<RouteDB>("Route", routeSchema);
