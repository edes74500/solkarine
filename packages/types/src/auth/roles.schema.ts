import { z } from "zod";

export const roleSchemaDB = z.object({
  _id: z.string(),
  name: z.string(),
  permissionsIds: z.array(z.string()), //*ref to permissions
  version: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createRoleSchema = z.object({
  name: z.string(),
  permissionsIds: z.array(z.string()), //*ref to permissions
});

export const updateRoleSchema = z.object({
  name: z.string(),
  permissionsIds: z.array(z.string()), //*ref to permissions
});

export type RoleDB = z.infer<typeof roleSchemaDB>;
export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;
