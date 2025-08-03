import { contactSchema, dateSchema, locationSchema, mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const announceLocationSchema = locationSchema;

export const announceContactSchema = contactSchema;

export const announceDateSchema = z.array(dateSchema);

export const announceDbSchema = z.object({
  _id: mongoIdSchema,
  bucketId: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  employerId: mongoIdSchema.optional(),
  employer_name: z.string(),
  createdBy: mongoIdSchema.optional(),
  accueil: z.array(z.string()),
  age: z.array(z.string()),
  isInFrance: z.boolean(),
  useEmployerProfilAddress: z.boolean(),
  location: z.array(announceLocationSchema),
  hasAccomodation: z.boolean(),
  poste: z.array(z.string()),
  typeContrat: z.string(),
  salary: z.string(),
  salaryFrequency: z.string(),
  experience: z.boolean(),
  from: z.date(),
  to: z.date().nullable(),
  severalContracts: z.boolean(),
  qualification: z.array(z.string().optional()),
  diplomes: z.array(z.string()),
  images: z.array(z.string().optional()),
  useEmployerContactInfos: z.boolean(),
  contact: announceContactSchema,
  isPremium: z.boolean(),
  active: z.boolean(),
  lastRefresh: z.date(),
  stagiaire: z.boolean().optional(),
  region_id: z.array(z.string()),
  department_id: z.array(z.string()),
  views: z.number(),
  favorites: z.number(),
  conversations: z.number(),
  date: announceDateSchema,
  shouldCheckSavedSearch: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const announceApiSchema = announceDbSchema.extend({
  id: z.string(), // virtual field
  _id: z.string(), // virtual field
  employerId: z.string(), // virtual field
  createdBy: z.string(), // virtual field
});

export const announceClientSchema = announceApiSchema
  .omit({
    _id: true,
    shouldCheckSavedSearch: true,
    region_id: true,
    department_id: true,
  })
  .extend({
    from: z.string(),
    to: z.string().nullable(),
    lastRefresh: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

export type AnnounceDb = z.infer<typeof announceDbSchema>;
export type AnnounceApi = z.infer<typeof announceApiSchema>;
export type AnnounceClient = z.infer<typeof announceClientSchema>;

//* DTOs
export const announceCreateSchema = announceDbSchema
  .pick({
    title: true,
    content: true,
    bucketId: true,
    employerId: true,
    accueil: true,
    age: true,
    isInFrance: true,
    useEmployerProfilAddress: true,
    location: true,
    hasAccomodation: true,
    poste: true,
    typeContrat: true,
    salary: true,
    salaryFrequency: true,
    experience: true,
    from: true,
    to: true,
    severalContracts: true,
    qualification: true,
    diplomes: true,
    images: true,
    useEmployerContactInfos: true,
    contact: true,
    active: true,
    isPremium: true,
  })
  .extend({
    from: z.string(),
    to: z.string().nullable(),
  });

export const announceQuerySchema = z.object({
  page: z.number(),
  department: z.array(z.string()).optional(),
  poste: z.array(z.string()).optional(),
  accueil: z.array(z.string()).optional(),
  typeContrat: z.array(z.string()).optional(),
  age: z.array(z.string()).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  stagiaire: z.string().optional(),
});

export const announceClientCardSchema = announceClientSchema
  .pick({
    id: true,
    title: true,
    excerpt: true,
    images: true,
    employer_name: true,
    accueil: true,
    age: true,
    poste: true,
    experience: true,
    stagiaire: true,
    severalContracts: true,
    typeContrat: true,
    from: true,
    to: true,
    location: true, // On inclut `location` dans la projection
    lastRefresh: true,
    createdAt: true,
    isPremium: true,
  })
  .extend({
    location: z.array(
      z.object({
        city: z.string().optional(),
        department_id: z.string().optional(),
        country: z.string().optional(),
      }),
    ),
  });

export const announceStatsSchema = z
  .object({
    totalCount: z.number(),
    departmentStats: z.array(
      z.object({
        _id: z.string(),
        count: z.number(),
      }),
    ),
    posteStats: z.array(
      z.object({
        _id: z.string(),
        count: z.number(),
      }),
    ),
    accueilStats: z.array(
      z.object({
        _id: z.string(),
        count: z.number(),
      }),
    ),
    typeContratStats: z.array(
      z.object({
        _id: z.string(),
        count: z.number(),
      }),
    ),
    stagiaireStats: z.array(
      z.object({
        _id: z.boolean(),
        count: z.number(),
      }),
    ),
    ageStats: z.array(
      z.object({
        _id: z.string(),
        count: z.number(),
      }),
    ),
  })
  .partial();

export type AnnounceQuery = z.infer<typeof announceQuerySchema>;
export type AnnounceClientCard = z.infer<typeof announceClientCardSchema>;
export type AnnounceCreateDTO = z.infer<typeof announceCreateSchema>;
export type AnnounceStats = z.infer<typeof announceStatsSchema>;
