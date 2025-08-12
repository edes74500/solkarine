import { addonDBSchema } from "src/addon.schema";
import { z } from "zod";

export const addonProfileSchemaDB = z.object({
  _id: z.string(),
  addon_id: z.string(),
  name: z.string(),
  description: z.string(),
  info: z.string().optional(),
  screenshots: z.array(z.string().url()).min(1).max(3),
  export_string: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const addonProfileSchemaClient = addonProfileSchemaDB
  .omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

export const addonProfileSchemaDBWithAddonPopulated = addonProfileSchemaClient.extend({
  addon_id: addonDBSchema,
});

export const createAddonProfileSchema = z.object({
  addon_id: z.string({
    required_error: "Veuillez sélectionner un addon",
  }),
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  info: z.string().optional(),
  export_string: z.string().min(10, {
    message: "Le contenu doit contenir au moins 10 caractères",
  }),
  screenshots: z
    .array(
      z
        .string()

        .url(),
    )
    .min(1, {
      message: "Vous devez ajouter au moins une screenshot",
    })
    .max(3, {
      message: "Vous ne pouvez pas ajouter plus de 3 screenshots",
    }),
});

export const updateAddonProfileSchema = createAddonProfileSchema.partial();

export type AddonProfileDB = z.infer<typeof addonProfileSchemaDB>;
export type AddonProfileClient = z.infer<typeof addonProfileSchemaClient>;
export type CreateAddonProfileForm = z.infer<typeof createAddonProfileSchema>;
export type UpdateAddonProfileForm = z.infer<typeof updateAddonProfileSchema>;
export type AddonProfileDBWithAddonPopulated = z.infer<typeof addonProfileSchemaDBWithAddonPopulated>;
