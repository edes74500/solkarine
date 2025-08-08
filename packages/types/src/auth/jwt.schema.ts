import { userSchemaDB } from "src/auth/user.schema";
import { z } from "zod";

export const jwtAccessTokenSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
  user: userSchemaDB,
});

export const jwtRefreshTokenSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
  user: userSchemaDB,
});

export type JwtAccessToken = z.infer<typeof jwtAccessTokenSchema>;
export type JwtRefreshToken = z.infer<typeof jwtRefreshTokenSchema>;
