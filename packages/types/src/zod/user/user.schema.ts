import { USER_ALLOWED_ROLES } from "@repo/constants";
import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const userRoleEnum = z.enum(USER_ALLOWED_ROLES);

export type RoleEnum = z.infer<typeof userRoleEnum>;

export const userDbSchema = z.object({
  _id: mongoIdSchema,
  firstname: z.string().min(2, "Votre prénom doit contenir au moins 2 caractères").max(30, "Prénom trop long"),
  lastname: z
    .string()
    .min(2, "Votre nom de famille doit contenir au moins 2 caractères")
    .max(30, "Nom de famille trop long"),
  email: z.string().email().min(5, "Email must be at least 5 characters").max(255, "Email too long"),
  password: z.string().optional(),
  avatar: z.string().default("https://randomuser.me/api/portraits/lego/1.jpg"),
  roles: z.array(userRoleEnum).default([]),
  facebookId: z.string().optional(),
  googleId: z.string().optional(),
  announcesLimit: z.number().default(10),
  isActive: z.boolean().default(false),
  isMailConfirmed: z.boolean().default(false),
  isSuspended: z.boolean().default(false),
  isPremium: z.boolean().default(false),
  bio: z.string().optional(),
  // notifyNewConversation: z.boolean().default(true),
  // notifyNewSavedSearch: z.boolean().default(true),
  lastConnection: z.date().default(() => new Date()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

//* base shema is for mongoDB state
export const userApiSchema = userDbSchema.extend({
  // virtuals
  id: z.string(),
  hasPassword: z.boolean(),
  isFacebookUser: z.boolean(),
  isGoogleUser: z.boolean(),
});

//* Schéma pour l'API (incluant les plugins et virtuals)
export const userClientSchema = userApiSchema.omit({
  _id: true,
  password: true,
  roles: true,
  facebookId: true,
  googleId: true,
});

export const userPublicSchema = userApiSchema.pick({
  firstname: true,
  lastname: true,
  bio: true,
  avatar: true,
  createdAt: true,
  isActive: true,
  id: true,
});

export type UserDb = z.infer<typeof userDbSchema>;
export type UserApi = z.infer<typeof userApiSchema>;
export type UserClient = z.infer<typeof userClientSchema>;
export type UserPublicClient = z.infer<typeof userPublicSchema>;

//* DTOs
export const userCreateAccountDto = z.object({
  firstname: z.string().min(2, "Votre prénom doit contenir au moins 2 caractères").max(30, "Prénom trop long"),
  lastname: z
    .string()
    .min(2, "Votre nom de famille doit contenir au moins 2 caractères")
    .max(30, "Nom de famille trop long"),
  email: z.string().email().min(5, "Email must be at least 5 characters").max(255, "Email too long"),
  password: z.string().min(8, "Password must be at least 8 characters").max(255, "Password too long"),
});

export type UserCreateAccountDto = z.infer<typeof userCreateAccountDto>;
