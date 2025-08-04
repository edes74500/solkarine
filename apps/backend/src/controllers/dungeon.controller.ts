import { addDungeon, clearAllDungeons, getAllDungeons } from "@/services/dungeons.service";
import { Season } from "@repo/types";
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

  res.status(200).json({ status: "success", message: "Season changed successfully" });
};

export const getAllDungeonsController = async (req: Request, res: Response) => {
  const dungeons = await getAllDungeons();
  res.status(200).json({ status: true, data: dungeons });
};
