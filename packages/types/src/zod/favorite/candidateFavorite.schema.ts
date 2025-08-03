import { candidatClientCardSchema, mongoIdSchema } from "@repo/types";
import { z } from "zod";

/* ===== FavoriteCandidate Schemas ===== */

// Schema API : structure du document dans la BDD
export const favoriteCandidateDbSchema = z.object({
  _id: mongoIdSchema,
  userId: mongoIdSchema.optional(),
  candidateId: mongoIdSchema.optional(),
  favoritedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const favoriteCandidateApiSchema = favoriteCandidateDbSchema.extend({
  id: mongoIdSchema,
  userId: z.string(),
  candidateId: z.string(),
});

export type FavoriteCandidateDb = z.infer<typeof favoriteCandidateDbSchema>;
export type FavoriteCandidateApi = z.infer<typeof favoriteCandidateApiSchema>;

// Schema Client : version envoyée au client (renommage de _id en id)
export const favoriteCandidateWithCandidateDataClientSchema = favoriteCandidateDbSchema.omit({ _id: true }).extend({
  id: mongoIdSchema,
  userId: z.string(),
  candidateId: z.string(),
  favoritedAt: z.string(),
  docs: candidatClientCardSchema,
});

export type FavoriteCandidateWithCandidateDataClient = z.infer<typeof favoriteCandidateWithCandidateDataClientSchema>;
