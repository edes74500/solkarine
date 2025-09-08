import { CreateTalentForm } from "@repo/types";
import mongoose from "mongoose";

export const mockCreateTalentForm = (customValues: Partial<CreateTalentForm> = {}): CreateTalentForm => {
  return {
    name: "test",
    screenshot: "http://example.com/image.jpg",
    class: 1,
    spec: 1,
    hero_talent: 1,
    dungeon_ids: [new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()],
    export_string: "export_string",
    info: "info",
    ...customValues,
  };
};
