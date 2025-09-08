import { z } from "zod";
import { dungeonSchema } from "./dungeon.schema";

// Schéma pour les dates de début et fin
export const DateRangeSchema = z.object({
  us: z.string(),
  eu: z.string(),
  tw: z.string(),
  kr: z.string(),
  cn: z.string(),
});

// Schéma pour une saison
export const SeasonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  blizzard_season_id: z.number(),
  is_main_season: z.boolean(),
  short_name: z.string(),
  seasonal_affix: z.string().nullable(),
  starts: DateRangeSchema,
  ends: DateRangeSchema,
  dungeons: z.array(dungeonSchema),
});

// Type TypeScript pour une saison
export type Season = z.infer<typeof SeasonSchema>;
