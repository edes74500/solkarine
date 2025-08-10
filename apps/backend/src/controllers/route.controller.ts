import { setImageToFolderInR2 } from "@/services/cdn.service";
import { getDungeonById } from "@/services/dungeons.service";
import { revalidateFetch } from "@/services/nextJsCache.service";
import { createRoute, deleteRouteById, getRoutesWithPopulatedDungeon, updateRoute } from "@/services/route.service";
import { createRouteSchema, updateRouteSchema } from "@repo/types";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const getRoutesWithPopulatedDungeonController = async (req: Request, res: Response) => {
  const routes = await getRoutesWithPopulatedDungeon();
  res.json({ success: true, data: routes });
};

export const createRouteController = async (req: Request, res: Response) => {
  const body = createRouteSchema.parse(req.body);

  const fileExtension = body.image.split(".").pop();
  const dungeon = await getDungeonById(body.dungeon_id);
  const newImageName = `${uuidv4().slice(0, 5)}_${body.name + "_" + dungeon.short_name.toLowerCase()}.${fileExtension}`;
  const imageUrl = await setImageToFolderInR2(body.image, "routes", newImageName);
  const route = await createRoute({ ...body, image: imageUrl });

  await revalidateFetch("routes-getRoutesWithPopulatedDungeon");

  res.json({ success: true, data: route });
};

export const deleteRouteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const success = await deleteRouteById(id);
  await revalidateFetch("routes-getRoutesWithPopulatedDungeon");

  res.json({ success: true, data: success });
};

export const updateRouteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = updateRouteSchema.parse(req.body);

  const success = await updateRoute(id, body);

  if (!success) {
    return res.status(400).json({ success: false, message: "Erreur lors de la modification de la route" });
  }
  await revalidateFetch("routes-getRoutesWithPopulatedDungeon");

  res.json({ success: true, data: success });
};
