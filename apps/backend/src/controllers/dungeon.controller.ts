import { addDungeon, clearAllDungeons, getAllDungeons, updateDungeon } from "@/services/dungeons.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { deleteAllRoutes } from "@/services/route.service";
import { NEXT_API_TAGS } from "@repo/constants";
import { EditDungeonForm, Season } from "@repo/types";
import { Request, Response } from "express";

export const changeSeasonController = async (req: Request, res: Response) => {
  const season: Season = req.body as Season;
  console.log(season);

  await clearAllDungeons();
  await Promise.all(
    season.dungeons.map(async (dungeon) => {
      await addDungeon(dungeon);
    }),
  );

  //* delete all routes et revalidate routes
  await deleteAllRoutes();
  await revalidateFetch(NEXT_API_TAGS.ROUTE.GET.GET_ALL_WITH_POPULATED_DUNGEON);

  res.status(200).json({ status: "success", message: "Season changed successfully" });
};

export const getAllDungeonsController = async (req: Request, res: Response) => {
  const dungeons = await getAllDungeons();
  res.status(200).json({ status: true, data: dungeons });
};

export const editDungeonController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dungeon: EditDungeonForm = req.body as EditDungeonForm;
  const success = await updateDungeon(id, dungeon);

  //* revalidate routes vu que le dungeon a changé potentellement de nom ou d'image
  await revalidateFetch(NEXT_API_TAGS.ROUTE.GET.GET_ALL_WITH_POPULATED_DUNGEON);
  res.status(200).json({ status: success });
};
