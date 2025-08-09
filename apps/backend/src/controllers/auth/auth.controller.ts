import { jwtCookieOptions } from "@/config/jwt.config";
import { User } from "@/models/auth/user.model";
import { generateJwtAccessToken, generateJwtRefreshToken, verifyJwtRefreshToken } from "@/services/auth/jwt.service";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { username, password, rememberMe } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = await generateJwtAccessToken(user._id);
  const refreshToken = await generateJwtRefreshToken(user._id);

  res.cookie("refresh_token", refreshToken, jwtCookieOptions);
  res.json({ success: true, accessToken });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }
  const decoded = await verifyJwtRefreshToken(refreshToken);

  if (typeof decoded === "string") {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const accessToken = await generateJwtAccessToken(decoded.userId);
  res.json({ success: true, accessToken });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: "Logged out" });
};
