import { Dungeon } from "@/models/dungeon.model";
import { CreateDungeonDb, DungeonApi } from "@repo/types";

export const addDungeon = async (dungeon: CreateDungeonDb): Promise<DungeonApi> => {
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
