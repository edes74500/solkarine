import { jwtAccessTokenConfig, jwtRefreshTokenConfig } from "@/config/jwt.config";
import { UnauthorizedError } from "@/errors/UnauthorisedError";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { dbGetUserByIdService } from "./user.service";

export const generateJwtAccessToken = async (userId: string): Promise<string> => {
  const user = await dbGetUserByIdService(userId);
  if (!user) throw new Error("User not found");
  return sign({ userId: user._id.toString(), username: user.username }, jwtAccessTokenConfig.secret, {
    expiresIn: jwtAccessTokenConfig.expiresIn,
  });
};

export const verifyJwtAccessToken = async (token: string): Promise<JwtPayload> => {
  try {
    const decoded = verify(token, jwtAccessTokenConfig.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new UnauthorizedError();
  }
};

export const generateJwtRefreshToken = async (userId: string): Promise<string> => {
  const user = await dbGetUserByIdService(userId);
  if (!user) throw new Error("User not found");
  return sign({ userId: user._id.toString(), username: user.username }, jwtRefreshTokenConfig.secret, {
    expiresIn: jwtRefreshTokenConfig.expiresIn,
  });
};

export const verifyJwtRefreshToken = async (token: string): Promise<JwtPayload> => {
  try {
    const decoded = verify(token, jwtRefreshTokenConfig.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new UnauthorizedError();
  }
};
