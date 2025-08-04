import { DungeonClient } from "@repo/types";
import { model, Schema } from "mongoose";

const dungeonSchema = new Schema<DungeonClient>({
  challenge_mode_id: { type: Number, required: true },
  slug: { type: String, required: true },
  name: { type: String, required: true },
  short_name: { type: String, required: true },
  keystone_timer_seconds: { type: Number, required: true },
  icon_url: { type: String, required: true },
  background_image_url: { type: String, required: true },
});

export const Dungeon = model<DungeonClient>("Dungeon", dungeonSchema);
