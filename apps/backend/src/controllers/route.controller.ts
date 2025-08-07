import { revalidateFetch } from "@/services/nextJsCache.service";
import { createRoute, deleteRoute, getRoutesWithPopulatedDungeon, updateRoute } from "@/services/route.service";
import { createRouteSchema, updateRouteSchema } from "@repo/types";
import { Request, Response } from "express";

export const getRoutesWithPopulatedDungeonController = async (req: Request, res: Response) => {
  const routes = await getRoutesWithPopulatedDungeon();
  res.json({ success: true, data: routes });
};

export const createRouteController = async (req: Request, res: Response) => {
  const body = createRouteSchema.parse(req.body);

  const route = await createRoute(body);

  await revalidateFetch("routes-getRoutesWithPopulatedDungeon");

  res.json({ success: true, data: route });
};

export const deleteRouteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const success = await deleteRoute(id);
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
