import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const employerDbSchema = z.object({
  _id: mongoIdSchema,
  createdBy: mongoIdSchema.optional(),
  name: z.string(),
  bio: z.string(),
  avatar: z.string().url().nullable().optional(),
  isInFrance: z.boolean(),
  location: z.object({
    city: z.string().optional(),
    zipCode: z.string().optional(),
    region_id: z.string().optional(),
    region: z.string().optional(),
    department: z.string().optional(),
    department_id: z.string().optional(),
    country: z.string(),
    country_id: z.string(),
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]), // Format GeoJSON : [longitude,
  }),

  contact: z.object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+?\d{10,14}$/, "Le numéro de téléphone n'est pas au bon format")
      .optional(),
    website: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const employerApiSchema = employerDbSchema.extend({
  id: z.string(),
  createdBy: z.string(),
});

export const employerClientSchema = employerDbSchema.omit({ _id: true }).extend({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type EmployerDb = z.infer<typeof employerDbSchema>;
export type EmployerApi = z.infer<typeof employerApiSchema>;
export type EmployerClient = z.infer<typeof employerClientSchema>;
export type EmployerCreateDto = z.infer<typeof employerApiSchema>;
