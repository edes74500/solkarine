import { z } from "zod";

export const characterSchemaDB = z.object({
  _id: z.string(),
  name: z.string(),
  server: z.string(),
  region: z.string(),
  raiderIo_link: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const characterSchemaClient = characterSchemaDB
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

export const createCharacterSchema = z.object({
  name: z.string(),
  server: z.string(),
  region: z.string(),
  raiderIo_link: z.string(),
});

export const editCharacterSchema = createCharacterSchema;

export type CharacterDB = z.infer<typeof characterSchemaDB>;
export type CharacterClient = z.infer<typeof characterSchemaClient>;
export type CreateCharacterForm = z.infer<typeof createCharacterSchema>;
export type EditCharacterForm = z.infer<typeof editCharacterSchema>;
