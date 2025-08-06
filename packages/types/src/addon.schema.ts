import { z } from "zod";

export const addonDBSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  addonUrl: z.string().url("L'URL de l'addon doit être valide"),
  tags: z.array(z.string()),
  info: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const addonApiSchema = addonDBSchema.extend({
  id: z.string(),
});

export const addonClientSchema = addonDBSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .omit({
    _id: true,
  });

export const createAddonSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  addonUrl: z.string().url("L'URL de l'addon doit être valide"),
  tags: z.array(z.string()).optional(),
  info: z.string().optional(),
});

export const editAddonSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  addonUrl: z.string().url("L'URL de l'addon doit être valide"),
  tags: z.array(z.string()).optional(),
  info: z.string().optional(),
});

export type AddonDB = z.infer<typeof addonDBSchema>;
export type AddonApi = z.infer<typeof addonApiSchema>;
export type AddonClient = z.infer<typeof addonClientSchema>;
export type CreateAddonForm = z.infer<typeof createAddonSchema>;
export type EditAddonForm = z.infer<typeof editAddonSchema>;
