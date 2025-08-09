import { z } from "zod";

export const jwtAccessTokenPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
});

export const jwtRefreshTokenPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
});

export type JwtAccessTokenPayload = z.infer<typeof jwtAccessTokenPayloadSchema>;
export type JwtRefreshTokenPayload = z.infer<typeof jwtRefreshTokenPayloadSchema>;
