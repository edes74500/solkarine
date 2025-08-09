import dotenv from "dotenv";
dotenv.config();

export const jwtAccessTokenConfig = {
  secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  expiresIn: process.env.NODE_ENV === "production" ? 60 * 60 : 1, //1 second in development
};

export const jwtRefreshTokenConfig = {
  secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  expiresIn: 60 * 60 * 24 * 7, //7 days
};

export const jwtCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 1000, //1 hour
  sameSite: "lax" as const,
};
