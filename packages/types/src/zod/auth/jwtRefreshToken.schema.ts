import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

export const jwtRefreshTokenDbSchema = z.object({
  _id: mongoIdSchema,
  userId: mongoIdSchema.optional(),
  userAgent: z.string().optional(),
  tokenId: z.string(),
  createdAt: z.coerce.date(),
  expiredAt: z.coerce.date().nullable(),
  userIp: z.string().nullable(),
  userGeoData: z
    .object({
      city: z.string().nullable(),
      region: z.string().nullable(),
      country: z.string().nullable(),
    })
    .nullable(),
  rememberMe: z.boolean(),
});

export const jwtRefreshTokenApiSchema = jwtRefreshTokenDbSchema.extend({
  id: mongoIdSchema,
});

export type JwtRefreshTokenDb = z.infer<typeof jwtRefreshTokenDbSchema>;
export type JwtRefreshTokenApi = z.infer<typeof jwtRefreshTokenApiSchema>;
