import { z } from "zod";

export const AffixSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  icon_url: z.string(),
  wowhead_url: z.string(),
});

export const GearSchema = z.object({
  item_level_equipped: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  source: z.string(),
});

export const MythicPlusRunSchema = z.object({
  dungeon: z.string(),
  short_name: z.string(),
  mythic_level: z.number(),
  completed_at: z.string(),
  clear_time_ms: z.number(),
  keystone_run_id: z.number(),
  par_time_ms: z.number(),
  num_keystone_upgrades: z.number(),
  map_challenge_mode_id: z.number(),
  zone_id: z.number(),
  zone_expansion_id: z.number(),
  icon_url: z.string(),
  background_image_url: z.string(),
  score: z.number(),
  affixes: z.array(AffixSchema),
  url: z.string(),
});

export const MythicPlusScoreSchema = z.object({
  all: z.number(),
  dps: z.number(),
  healer: z.number(),
  tank: z.number(),
  spec_0: z.number(),
  spec_1: z.number(),
  spec_2: z.number(),
  spec_3: z.number(),
});

export const MythicPlusSegmentSchema = z.object({
  color: z.string(),
  score: z.number(),
});

export const MythicPlusSeasonSchema = z.object({
  scores: MythicPlusScoreSchema,
  season: z.string(),
  segments: z.object({
    all: MythicPlusSegmentSchema,
    dps: MythicPlusSegmentSchema,
    healer: MythicPlusSegmentSchema,
    tank: MythicPlusSegmentSchema,
    spec_0: MythicPlusSegmentSchema,
    spec_1: MythicPlusSegmentSchema,
    spec_2: MythicPlusSegmentSchema,
    spec_3: MythicPlusSegmentSchema,
  }),
});

export const MythicPlusScoresBySeasonSchema = z.record(MythicPlusSeasonSchema);

export const CharacterSchema = z.object({
  name: z.string(),
  race: z.string(),
  class: z.string(),
  active_spec_name: z.string(),
  active_spec_role: z.string(),
  gender: z.string(),
  faction: z.string(),
  achievement_points: z.number(),
  thumbnail_url: z.string(),
  region: z.string(),
  realm: z.string(),
  last_crawled_at: z.string(),
  profile_url: z.string(),
  profile_banner: z.string(),
  gear: GearSchema,
  mythic_plus_best_runs: z.array(MythicPlusRunSchema),
  mythic_plus_scores_by_season: MythicPlusScoresBySeasonSchema,
});

export type RaiderioCharacter = z.infer<typeof CharacterSchema>;
export type RaiderioMythicPlusRun = z.infer<typeof MythicPlusRunSchema>;
export type RaiderioMythicPlusScore = z.infer<typeof MythicPlusScoreSchema>;
export type RaiderioMythicPlusSeason = z.infer<typeof MythicPlusSeasonSchema>;
export type RaiderioAffix = z.infer<typeof AffixSchema>;
export type RaiderioMythicPlusScoresBySeason = z.infer<typeof MythicPlusScoresBySeasonSchema>;
