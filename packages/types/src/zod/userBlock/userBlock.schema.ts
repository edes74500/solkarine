import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const UserBlockDbSchema = z.object({
  _id: mongoIdSchema,
  blockerId: z.string(),
  blockedId: z.string(),
  blockedAt: z.coerce.date(),
  reason: z.string().optional(),
  blockedFirstname: z.string(),
  blockedAvatar: z.string(),
});

export const UserBlockApiSchema = UserBlockDbSchema.extend({
  id: z.string(),
  _id: z.string(),
});

export const UserBlockClientSchema = UserBlockApiSchema.omit({ _id: true }).extend({
  blockedAt: z.string(),
});

export type UserBlockDb = z.infer<typeof UserBlockDbSchema>;
export type UserBlockApi = z.infer<typeof UserBlockApiSchema>;
export type UserBlockClient = z.infer<typeof UserBlockClientSchema>;
