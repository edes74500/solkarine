import { z } from "zod";

export const talentDBSchema = z.object({
  _id: z.string(),
  name: z.string(),
  screenshot: z.string().url("L'URL de l'image doit être valide"),
  description: z.string(),
  info: z.string().optional(),

  class: z.string(),
  spec: z.string(),
  hero_talent: z.string(),

  dungeon: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TalentDB = z.infer<typeof talentDBSchema>;
