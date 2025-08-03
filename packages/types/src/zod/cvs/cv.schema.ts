import { mongoIdSchema } from "src/zod/shared/sharedSchema";
import { z } from "zod";

export const cvDbSchema = z.object({
  _id: mongoIdSchema,
  name: z.string(),
  description: z.string(),
  url: z.string(),
  createdBy: z.string(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CvSchemaApi = cvDbSchema.extend({
  id: z.string(),
});

export const CvSchemaClient = cvDbSchema.omit({ _id: true }).extend({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CvDb = z.infer<typeof cvDbSchema>;
export type CvApi = z.infer<typeof CvSchemaApi>;
export type CvClient = z.infer<typeof CvSchemaClient>;
