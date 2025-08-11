import { CreateRouteForm, RouteDB, RouteDBWithDungeonPopulated, UpdateRouteForm } from "@repo/types";
import { Route } from "../models/route.model";

export const getRoutesWithPopulatedDungeon = async (): Promise<RouteDBWithDungeonPopulated[]> => {
  const routes = await Route.find({}).populate("dungeon_id").lean({ virtuals: true });

  return routes as unknown as RouteDBWithDungeonPopulated[];
};

export const createRoute = async (route: CreateRouteForm): Promise<RouteDB> => {
  const newRoute = await Route.create(route);

  return newRoute;
};

export const getRouteById = async (id: string): Promise<RouteDB> => {
  try {
    const route = await Route.findById(id).lean({ virtuals: true });

    return route as unknown as RouteDB;
  } catch (error) {
    console.error("Error getting route by id", error);
    throw new Error("Error getting route by id");
  }
};

export const deleteRouteById = async (id: string): Promise<boolean> => {
  const route = await Route.findByIdAndDelete(id);

  return route ? true : false;
};

export const updateRoute = async (id: string, route: UpdateRouteForm, previousImage: string): Promise<boolean> => {
  const updatedRoute = await Route.findByIdAndUpdate(id, route, { new: true });

  return updatedRoute ? true : false;
};

export const deleteAllRoutes = async (): Promise<boolean> => {
  const routes = await Route.deleteMany({});

  return routes ? true : false;
};
