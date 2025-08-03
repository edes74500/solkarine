import { mongoIdSchema, userRoleEnum } from "@repo/types";
import { z } from "zod";

export const jwtAccessTokenPayloadSchema = z.object({
  userId: mongoIdSchema,
  firstname: z.string(),
  lastname: z.string(),
  avatar: z.string(),
  email: z.string().email(),
  roles: z.array(userRoleEnum),
  isPremium: z.boolean(),
  isSuspended: z.boolean(),
  // notifyNewConversation: z.boolean(),
  // notifyNewSavedSearch: z.boolean(),
});

export const jwtMailResetPasswordTokenPayloadSchema = z.object({
  userId: mongoIdSchema,
  email: z.string().email(),
  firstname: z.string(),
});

export const jwtMailConfirmationTokenPayloadSchema = z.object({
  userId: mongoIdSchema,
  email: z.string().email(),
});

export const jwtRefreshTokenPayloadSchema = z.object({
  userId: mongoIdSchema,
  tokenId: z.string(),
  rememberMe: z.boolean(),
});

export type JwtMailResetPasswordTokenPayload = z.infer<typeof jwtMailResetPasswordTokenPayloadSchema>;
export type JwtMailConfirmationTokenPayload = z.infer<typeof jwtMailConfirmationTokenPayloadSchema>;
export type JwtAccessTokenPayload = z.infer<typeof jwtAccessTokenPayloadSchema>;
export type JwtRefreshTokenPayload = z.infer<typeof jwtRefreshTokenPayloadSchema>;
