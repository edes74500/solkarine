import { announceQuerySchema, mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const savedSearchAnnounceFiltersSchema = announceQuerySchema.omit({ page: true }).extend({
  stagiaire: z.boolean().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
});

export const savedSearchAnnounceDbSchema = z.object({
  _id: mongoIdSchema,
  userId: mongoIdSchema.optional(),
  name: z.string().min(1).max(30),
  type: z.enum(["offre d'emploi", "candidat"]),
  key: z.string().min(1),
  mailNotification: z.boolean(),
  mobileNotification: z.boolean(),
  filters: savedSearchAnnounceFiltersSchema,
  lastNotified: z.coerce.date().optional(),
  unseenCount: z.number(),
  tags: z.array(z.string()),
});

export const savedSearchAnnounceApiSchema = savedSearchAnnounceDbSchema.extend({
  id: z.string().min(1),
});

export const savedSearchAnnounceCreateDtoSchema = savedSearchAnnounceApiSchema
  .omit({ _id: true, key: true, tags: true, userId: true, lastNotified: true, unseenCount: true, id: true })
  .extend({
    filters: savedSearchAnnounceFiltersSchema.extend({
      from: z.string().optional(),
      to: z.string().optional(),
    }),
  });

export const savedSearchAnnounceClientSchema = savedSearchAnnounceApiSchema
  .omit({ _id: true, key: true, tags: true })
  .extend({
    id: z.string().min(1),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
    filters: savedSearchAnnounceFiltersSchema.extend({
      from: z.string().optional(),
      to: z.string().optional(),
    }),
  });

export type SavedSearchAnnounceFilters = z.infer<typeof savedSearchAnnounceFiltersSchema>;
export type SavedSearchAnnounceCreateDto = z.infer<typeof savedSearchAnnounceCreateDtoSchema>;
export type SavedSearchAnnounceDb = z.infer<typeof savedSearchAnnounceDbSchema>;
export type SavedSearchAnnounceApi = z.infer<typeof savedSearchAnnounceApiSchema>;
export type SavedSearchAnnounceClient = z.infer<typeof savedSearchAnnounceClientSchema>;
