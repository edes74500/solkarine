import { z } from "zod";

// Schémas de base
const HashSchema = z.object({
  value: z.string(),
  algo: z.number(),
});

const ModuleSchema = z.object({
  name: z.string(),
  fingerprint: z.number(),
});

const DependencySchema = z.object({
  modId: z.number(),
  relationType: z.number(),
});

const SortableGameVersionSchema = z.object({
  gameVersionName: z.string(),
  gameVersionPadded: z.string(),
  gameVersion: z.string(),
  gameVersionReleaseDate: z.string(),
  gameVersionTypeId: z.number(),
});

const FileIndexSchema = z.object({
  gameVersion: z.string(),
  fileId: z.number(),
  filename: z.string(),
  releaseType: z.number(),
  gameVersionTypeId: z.number(),
  modLoader: z.number().optional(),
});

const FileSchema = z.object({
  id: z.number(),
  gameId: z.number(),
  modId: z.number(),
  isAvailable: z.boolean(),
  displayName: z.string(),
  fileName: z.string(),
  releaseType: z.number(),
  fileStatus: z.number(),
  hashes: z.array(HashSchema),
  fileDate: z.string(),
  fileLength: z.number(),
  downloadCount: z.number(),
  fileSizeOnDisk: z.number().optional(),
  downloadUrl: z.string().nullable(),
  gameVersions: z.array(z.string()),
  sortableGameVersions: z.array(SortableGameVersionSchema),
  dependencies: z.array(DependencySchema),
  exposeAsAlternative: z.boolean().optional(),
  parentProjectFileId: z.number().optional(),
  alternateFileId: z.number(),
  isServerPack: z.boolean(),
  serverPackFileId: z.number().optional(),
  isEarlyAccessContent: z.boolean().optional(),
  earlyAccessEndDate: z.string().optional(),
  fileFingerprint: z.number(),
  modules: z.array(ModuleSchema),
});

const ImageSchema = z.object({
  id: z.number(),
  modId: z.number(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  url: z.string(),
});

const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
});

const CategorySchema = z.object({
  id: z.number(),
  gameId: z.number(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
  iconUrl: z.string(),
  dateModified: z.string(),
  isClass: z.boolean(),
  classId: z.number(),
  parentCategoryId: z.number(),
  displayIndex: z.number().optional(),
});

const LinksSchema = z.object({
  websiteUrl: z.string(),
  wikiUrl: z.string().nullable(),
  issuesUrl: z.string().nullable(),
  sourceUrl: z.string().nullable(),
});

// Schéma principal pour un mod
const ModSchema = z.object({
  id: z.number(),
  gameId: z.number(),
  name: z.string(),
  slug: z.string(),
  links: LinksSchema,
  summary: z.string(),
  status: z.number(),
  downloadCount: z.number(),
  isFeatured: z.boolean(),
  primaryCategoryId: z.number(),
  categories: z.array(CategorySchema),
  classId: z.number(),
  authors: z.array(AuthorSchema),
  logo: ImageSchema.nullable(),
  screenshots: z.array(ImageSchema),
  mainFileId: z.number(),
  latestFiles: z.array(FileSchema),
  latestFilesIndexes: z.array(FileIndexSchema),
  latestEarlyAccessFilesIndexes: z.array(FileIndexSchema),
  dateCreated: z.string(),
  dateModified: z.string(),
  dateReleased: z.string(),
  allowModDistribution: z.boolean(),
  gamePopularityRank: z.number(),
  isAvailable: z.boolean(),
  thumbsUpCount: z.number(),
  rating: z.number().optional(),
});

// Schéma pour la pagination
const PaginationSchema = z.object({
  index: z.number(),
  pageSize: z.number(),
  resultCount: z.number(),
  totalCount: z.number(),
});

// Schéma pour la réponse complète
export const CurseForgeApiResponseSchema = z.object({
  data: z.array(ModSchema),
  pagination: PaginationSchema,
});

export type CurseForgeApiResponse = z.infer<typeof CurseForgeApiResponseSchema>;
export type CurseForgeMod = z.infer<typeof ModSchema>;
export type CurseForgeFile = z.infer<typeof FileSchema>;
export type CurseForgeCategory = z.infer<typeof CategorySchema>;
export type CurseForgeAuthor = z.infer<typeof AuthorSchema>;
