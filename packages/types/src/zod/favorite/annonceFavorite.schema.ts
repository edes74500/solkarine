import { announceClientCardSchema, mongoIdSchema } from "@repo/types";
import { z } from "zod";

/* ===== FavoriteAnnounce Schemas ===== */

// Schema API : structure du document dans la BDD
export const favoriteAnnounceDbSchema = z.object({
  _id: mongoIdSchema,
  userId: mongoIdSchema.optional(),
  announceId: mongoIdSchema.optional(),
  favoritedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const favoriteAnnounceApiSchema = favoriteAnnounceDbSchema.extend({
  id: mongoIdSchema,
  userId: z.string(),
  announceId: z.string(),
});

export type FavoriteAnnounceDb = z.infer<typeof favoriteAnnounceDbSchema>;
export type FavoriteAnnounceApi = z.infer<typeof favoriteAnnounceApiSchema>;

// Schema Client : version envoyée au client (renommage de _id en id)
export const favoriteAnnounceWithAnnounceDataClientSchema = favoriteAnnounceDbSchema.omit({ _id: true }).extend({
  id: mongoIdSchema,
  userId: z.string(),
  announceId: z.string(),
  favoritedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  docs: announceClientCardSchema,
});

// export type FavoriteAnnounceApi = z.infer<typeof favoriteAnnounceApiSchema>;
export type FavoriteAnnounceWithAnnounceDataClient = z.infer<typeof favoriteAnnounceWithAnnounceDataClientSchema>;
