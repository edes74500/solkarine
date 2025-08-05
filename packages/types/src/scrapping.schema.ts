import { z } from "zod";

export const ogTagsSchema = z.record(z.string());

export const twitterTagsSchema = z.record(z.string());

export const basicMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  favicon: z.string(),
  ogImageUrl: z.string(),
});

export const scrapingResultSchema = z.object({
  url: z.string(),
  openGraph: ogTagsSchema,
  twitter: twitterTagsSchema,
  basic: basicMetaSchema,
  timestamp: z.string(),
});

export const ogScraperQuerySchema = z.object({
  url: z.string().optional(),
});

export type OGTags = z.infer<typeof ogTagsSchema>;
export type TwitterTags = z.infer<typeof twitterTagsSchema>;
export type BasicMeta = z.infer<typeof basicMetaSchema>;
export type ScrapingResult = z.infer<typeof scrapingResultSchema>;
export type OGScraperQuery = z.infer<typeof ogScraperQuerySchema>;
