import { mongoIdSchema } from "@repo/types";
import z from "zod";

export const userSettingsDbSchema = z.object({
  _id: z.string(),
  userId: mongoIdSchema.optional(),
  emailNewConversation: z.boolean().default(true),
  emailDailySavedSearch: z.boolean().default(true),
  emailCronAnnounceSetToInactive: z.boolean().default(false),
  emailCronCandidateSetToInactive: z.boolean().default(false),
});

export const userSettingsApiSchema = userSettingsDbSchema.extend({
  id: z.string(),
  userId: z.string(),
});

export const userSettingsClientSchema = userSettingsApiSchema.omit({
  _id: true,
});

export type UserSettingsDb = z.infer<typeof userSettingsDbSchema>;
export type UserSettingsApi = z.infer<typeof userSettingsApiSchema>;
export type UserSettingsClient = z.infer<typeof userSettingsClientSchema>;
