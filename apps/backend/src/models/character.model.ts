import { CharacterDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const characterSchema = new Schema<CharacterDB>(
  {
    name: { type: String, required: true },
    server: { type: String, required: true },
    region: { type: String, required: true },
    raiderIo_link: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

characterSchema.plugin(mongooseLeanVirtuals);

characterSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Character = model<CharacterDB>("Character", characterSchema);
