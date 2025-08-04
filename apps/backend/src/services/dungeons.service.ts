import { Dungeon } from "@/models/dungeon.model";
import { CreateDungeonForm, DungeonApi, EditDungeonForm } from "@repo/types";

export const addDungeon = async (dungeon: CreateDungeonForm): Promise<DungeonApi> => {
  const newDungeon = await Dungeon.create(dungeon);
  return newDungeon as unknown as DungeonApi;
};

export const clearAllDungeons: () => Promise<void> = async () => {
  await Dungeon.deleteMany({});
};

export const getAllDungeons = async (): Promise<DungeonApi[]> => {
  const dungeons = await Dungeon.find();
  return dungeons.map((dungeon) => dungeon.toObject() as unknown as DungeonApi);
};

export const updateDungeon = async (id: string, dungeon: EditDungeonForm): Promise<boolean> => {
  const updatedDungeon = await Dungeon.findByIdAndUpdate(id, dungeon, { new: true });
  const success = updatedDungeon !== null;
  return success;
};
