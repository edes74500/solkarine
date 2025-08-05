import { WEAK_AURA_TAGS } from "@repo/constants";
import { z } from "zod";

export const weakAuraDBSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
  info: z.string().optional(),
  tags: z.array(z.enum(WEAK_AURA_TAGS)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const weakAuraApiSchema = weakAuraDBSchema.extend({
  id: z.string(),
});

export const weakAuraClientSchema = weakAuraDBSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .omit({
    _id: true,
  });

export const createWeakAuraSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1).url("L'image doit etre un lien valide"),
  url: z
    .string()
    .min(1)
    .url("L'url doit etre un lien valide")
    .refine((url) => url.includes("wago.io"), {
      message: "L'url doit etre un lien wago.io",
    }),
  info: z.string().optional(),
  tags: z.array(z.enum(WEAK_AURA_TAGS)).min(1, "Au moins un tag doit être sélectionné"),
});

export const editWeakAuraSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1).url("L'image doit etre un lien valide"),
  info: z.string().optional(),
  tags: z.array(z.enum(WEAK_AURA_TAGS)).min(1, "Au moins un tag doit être sélectionné"),
});

export type WeakAuraDB = z.infer<typeof weakAuraDBSchema>;
export type WeakAuraApi = z.infer<typeof weakAuraApiSchema>;
export type WeakAuraClient = z.infer<typeof weakAuraClientSchema>;
export type CreateWeakAuraForm = z.infer<typeof createWeakAuraSchema>;
export type EditWeakAuraForm = z.infer<typeof editWeakAuraSchema>;
