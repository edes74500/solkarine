import { PermissionDB } from "@repo/types";
import mongoose, { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const permissionSchema = new Schema<PermissionDB>(
  {
    _id: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

permissionSchema.plugin(mongooseLeanVirtuals);

permissionSchema.virtual("id").get(function (this: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  return this._id.toHexString();
});

export const Permission = model<PermissionDB>("Permission", permissionSchema);
