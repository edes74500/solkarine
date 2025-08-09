import { z } from "zod";

export const permissionSchemaDB = z.object({
  _id: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PermissionDB = z.infer<typeof permissionSchemaDB>;
