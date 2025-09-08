import { z } from "zod";
import { dungeonDbSchema } from "./dungeon.schema";

export const routeSchemaDB = z.object({
  _id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  dungeon_id: z.string(),
  difficulty: z.number(),
  speed: z.number(),
  key_level: z.object({
    min: z.number(),
    max: z.number(),
  }),
  info: z.string().optional(),
  image: z.string().min(1),
  lien_mdt: z.string(),
  createdAt: z.date(),

  updatedAt: z.date(),
});

export const routeSchemaDBWithDungeonPopulated = routeSchemaDB
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    dungeon_id: dungeonDbSchema,
  })
  .omit({
    _id: true,
  });

export const routeSchemaClient = routeSchemaDB
  .omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    dungeon: dungeonDbSchema,
  });

export const createRouteSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  dungeon_id: z.string().min(1),
  difficulty: z.number(),
  speed: z.number(),
  lien_mdt: z.string().min(1, "Le lien MDT est requis"),
  key_level: z.object({
    min: z.number(),
    max: z.number(),
  }),
  info: z.string().optional(),
  image: z.string(),
});

export const updateRouteSchema = createRouteSchema;

export type RouteDB = z.infer<typeof routeSchemaDB>;
export type RouteClient = z.infer<typeof routeSchemaClient>;
export type CreateRouteForm = z.infer<typeof createRouteSchema>;
export type RouteDBWithDungeonPopulated = z.infer<typeof routeSchemaDBWithDungeonPopulated>;
export type UpdateRouteForm = z.infer<typeof updateRouteSchema>;
