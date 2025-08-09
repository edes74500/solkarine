import { z } from "zod";

export const jwtAccessTokenPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export const jwtRefreshTokenPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type JwtAccessTokenPayload = z.infer<typeof jwtAccessTokenPayloadSchema>;
export type JwtRefreshTokenPayload = z.infer<typeof jwtRefreshTokenPayloadSchema>;
