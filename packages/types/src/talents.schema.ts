import { CLASS_AND_TALENTS } from "@repo/constants";
import { z } from "zod";
import { dungeonDbSchema } from "./dungeon.schema";

export const talentDBSchema = z.object({
  _id: z.string(),
  name: z.string(),
  screenshot: z.string().url("L'URL de l'image doit être valide"),
  // description: z.string(),
  info: z.string().optional(),

  class: z.number(),
  spec: z.number(),
  hero_talent: z.number(),

  dungeon_ids: z.array(z.string()),
  export_string: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const talentDBSchemaWithDungeonPopulated = talentDBSchema.extend({
  dungeon_ids: z.array(dungeonDbSchema),
});

export const talentSchemaClientWithDungeonPopulated = talentDBSchemaWithDungeonPopulated.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTalentSchema = z
  .object({
    name: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    }),
    //  description: z.string().min(10, {
    //   message: "La description doit contenir au moins 10 caractères",
    // }),
    info: z.string().optional(),
    // message: "La description doit contenir au moins 10 caractères",
    // }),
    // info: z.string().optional(),
    screenshot: z.string().url("L'URL de l'image doit être valide"),
    class: z.number(),
    spec: z.number(),
    hero_talent: z.number(),
    dungeon_ids: z
      .array(z.string().min(1, { message: "Veuillez sélectionner au moins un donjon" }))
      .min(1, { message: "Veuillez sélectionner au moins un donjon" }),
    export_string: z.string().min(1, { message: "Ajoutez le code du talent" }),
  })
  .refine((data) => data.class !== 0, {
    message: "Veuillez sélectionner une classe",
    path: ["class"],
  })
  .refine((data) => data.spec !== 0, {
    message: "Veuillez sélectionner une spécialisation",
    path: ["spec"],
  })
  .refine(
    (data) => {
      // Vérifie si la classe existe dans CLASS_AND_TALENTS
      if (!(data.class in CLASS_AND_TALENTS)) {
        return false;
      }
      // Vérifie si un talent héroïque est sélectionné
      return data.hero_talent !== 0;
    },
    {
      message: "Veuillez sélectionner un talent héroïque",
      path: ["hero_talent"],
    },
  );

export const editTalentSchema = createTalentSchema;

export type TalentsDB = z.infer<typeof talentDBSchema>;
export type CreateTalentForm = z.infer<typeof createTalentSchema>;
export type EditTalentForm = z.infer<typeof editTalentSchema>;
export type TalentsDBWithDungeonPopulated = z.infer<typeof talentDBSchemaWithDungeonPopulated>;
export type TalentClientWithDungeonPopulated = z.infer<typeof talentSchemaClientWithDungeonPopulated>;
