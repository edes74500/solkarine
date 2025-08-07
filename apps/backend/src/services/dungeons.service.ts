import { Dungeon } from "@/models/dungeon.model";
import { CreateDungeonForm, DungeonApi, DungeonDb, EditDungeonForm } from "@repo/types";

export const addDungeon = async (dungeon: CreateDungeonForm): Promise<DungeonApi> => {
  const newDungeon = await Dungeon.create(dungeon);
  return newDungeon as unknown as DungeonApi;
};

export const clearAllDungeons: () => Promise<void> = async () => {
  await Dungeon.deleteMany({});
};

export const getAllDungeons = async (): Promise<DungeonDb[]> => {
  const dungeons = await Dungeon.find({}).lean({ virtuals: true });
  return dungeons as unknown as DungeonDb[];
};

export const updateDungeon = async (id: string, dungeon: EditDungeonForm): Promise<boolean> => {
  const updatedDungeon = await Dungeon.findByIdAndUpdate(id, dungeon, { new: true });
  const success = updatedDungeon !== null;
  return success;
};
