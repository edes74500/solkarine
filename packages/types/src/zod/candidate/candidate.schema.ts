import { contactSchema, locationSchema, mongoIdSchema } from "@repo/types";
import z from "zod";

export const candidateDbSchema = z.object({
  // Identifiants
  _id: mongoIdSchema,
  createdBy: mongoIdSchema.optional(),

  // Informations personnelles de base
  firstname: z.string(),
  lastname: z.string(),
  birthdate: z.coerce.date(),
  genre: z.string(),

  // Informations professionnelles
  title: z.string(),
  bio: z.string(),
  excerpt: z.string(),
  experience: z.string(),
  hobbies: z.string(),

  // Disponibilité
  date: z.array(
    z.object({
      from: z.coerce.date(),
      to: z.coerce.date(),
    }),
  ),

  // Localisation
  isInFrance: z.boolean(),
  location: locationSchema,

  // Catégorisation
  diplomes: z.array(z.string()),
  qualification: z.array(z.string().optional()),
  poste: z.array(z.string().min(1, { message: "Poste is required" })),
  age: z.array(z.string()),
  accueil: z.array(z.string()),
  search: z.array(z.string()),

  // Médias
  images: z.array(z.string()),
  cv: z.string(),
  avatar: z.string(),

  // Contact
  contact: contactSchema,

  // Statut
  active: z.boolean(),
  isPremium: z.boolean(),
  hasCV: z.boolean(),

  // Statistiques
  views: z.number(),
  favorites: z.number(),
  conversations: z.number(),
  lastRefresh: z.date(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const candidateApiSchema = candidateDbSchema.extend({
  //ajout des virtuals
  id: z.string(),
  createdBy: z.string(),
  disponibilityRange: z
    .object({
      from: z.coerce.date(),
      to: z.coerce.date(),
    })
    .optional(),
});

export const candidateClientSchema = candidateApiSchema
  .omit({
    _id: true,
  })
  .extend({
    createdBy: z.string(),
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    birthdate: z.string(),
    date: z.array(
      z.object({
        from: z.string(),
        to: z.string(),
      }),
    ),
    disponibilityRange: z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .optional(),
  });

export type CandidateDb = z.infer<typeof candidateDbSchema>;
export type CandidateApi = z.infer<typeof candidateApiSchema>;
export type CandidateClient = z.infer<typeof candidateClientSchema>;

export const candidatClientCardSchema = candidateClientSchema
  .pick({
    id: true,
    firstname: true,
    lastname: true,
    birthdate: true,
    location: true,
    avatar: true,
    isPremium: true,
    hasCV: true,
    active: true,
    qualification: true,
    date: true,
    lastRefresh: true,
    diplomes: true,
    poste: true,
    accueil: true,
    title: true,
    excerpt: true,
  })
  .extend({
    location: z.object({
      city: z.string().optional(),
      department_id: z.string().optional(),
      country: z.string(),
    }),
    disponibilityRange: z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .optional(),
  });

export const candidateCreateSchema = candidateDbSchema
  .pick({
    firstname: true,
    lastname: true,
    birthdate: true,
    genre: true,
    title: true,
    bio: true,
    // excerpt: true,
    experience: true,
    hobbies: true,
    date: true,
    location: true,
    isInFrance: true,
    diplomes: true,
    qualification: true,
    poste: true,
    age: true,
    accueil: true,
    search: true,
    images: true,
    cv: true,
    avatar: true,
    contact: true,
    active: true,
    hasCV: true,
  })
  .extend({
    birthdate: z.string(),
    date: z.array(
      z.object({
        from: z.string(),
        to: z.string(),
      }),
    ),
  });

export const candidatQueryFiltersClientSchema = z
  .object({
    poste: z.array(z.string()).optional(),
    age: z.array(z.string()).optional(),
    accueil: z.array(z.string()).optional(),
    search: z.array(z.string()).optional(),
    diplomes: z.array(z.string()).optional(),
    qualification: z.array(z.string()).optional(),
    hasCV: z.string().optional(),
    location: z
      .object({
        name: z.string(),
        zipCode: z.string(),
        coordinates: z.tuple([z.number(), z.number()]),
        distance: z.number(),
      })
      .optional(),
    page: z.number().default(1),
    limit: z.number().optional(),
  })
  .partial();

export const candidatQueryFiltersApiSchema = z.object({
  poste: z.array(z.string()).optional(),
  age: z.array(z.string()).optional(),
  accueil: z.array(z.string()).optional(),
  search: z.array(z.string()).optional(),
  diplomes: z.array(z.string()).optional(),
  qualification: z.array(z.string()).optional(),
  hasCV: z.string().optional(),
  location: z.string().optional(), // Format: latitude_longitude_radius_distance
  page: z.number().optional().default(1),
});

export type CandidateCreate = z.infer<typeof candidateCreateSchema>;
export type CandidateClientCard = z.infer<typeof candidatClientCardSchema>;
export type CandidateQueryFiltersClient = z.infer<typeof candidatQueryFiltersClientSchema>;
export type CandidateQueryFiltersApi = z.infer<typeof candidatQueryFiltersApiSchema>;
