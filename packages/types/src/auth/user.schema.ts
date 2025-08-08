import { z } from "zod";

export const userSchemaDB = z.object({
  _id: z.string(),
  name: z.string(),
  password: z.string(),
  roleIds: z.array(z.string()), //*ref to roles
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  role: z.array(z.string()), //*ref to roles
});

export const updateUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  role: z.array(z.string()), //*ref to roles
});

export type UserDB = z.infer<typeof userSchemaDB>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
