import { z } from "zod";

export const dungeonDbSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),
  challenge_mode_id: z.number(),
  short_name: z.string(),
  keystone_timer_seconds: z.number(),
  icon_url: z.string(),
  background_image_url: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createDungeonDbSchema = dungeonDbSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export const editDungeonSchema = z.object({
  name: z.string(),
  slug: z.string(),
  short_name: z.string(),
  keystone_timer_seconds: z.number(),
  icon_url: z.string(),
  background_image_url: z.string(),
});

export const dungeonSchema = z.object({
  id: z.number(),
  challenge_mode_id: z.number(),
  slug: z.string(),
  name: z.string(),
  short_name: z.string(),
  keystone_timer_seconds: z.number(),
  icon_url: z.string(),
  background_image_url: z.string(),
});

export const dungeonApiSchema = dungeonDbSchema.extend({
  id: z.string(),
});

export const dungeonClientSchema = dungeonApiSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .omit({
    _id: true,
  });

export type EditDungeonForm = z.infer<typeof editDungeonSchema>;
export type CreateDungeonForm = z.infer<typeof createDungeonDbSchema>;
export type DungeonDb = z.infer<typeof dungeonDbSchema>;
export type DungeonApi = z.infer<typeof dungeonApiSchema>;
export type DungeonClient = z.infer<typeof dungeonClientSchema>;
