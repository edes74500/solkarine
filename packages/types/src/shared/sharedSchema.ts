import { z } from "zod";

export const locationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
  country: z.string(),
  country_id: z.string(),
  region: z.string().optional(),
  department: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  region_id: z.string().optional(),
  department_id: z.string().optional(),
});

export const contactSchema = z.object({
  email: z.string().email().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?\d{10,14}$/, "Le numéro de téléphone n'est pas au bon format")
    .optional(),
  facebook: z.string().optional(),
});

export const dateSchema = z.object({
  from: z.date(),
  to: z.date().nullable(),
});

export const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const paginationResponseSchema = z.object({
  totalDocs: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  page: z.number(),
  pagingCounter: z.number(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
  prevPage: z.union([z.number(), z.null()]),
  nextPage: z.union([z.number(), z.null()]),
});

export type ContactSchema = z.infer<typeof contactSchema>;
export type LocationSchema = z.infer<typeof locationSchema>;
export type PaginateResult<T> = z.infer<typeof paginationResponseSchema> & { docs: T[] };
