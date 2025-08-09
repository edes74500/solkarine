import { User } from "@/models/auth/user.model";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { username, password, rememberMe } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: rememberMe ? "7d" : "1h",
  });
  res.json({ accessToken });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  return res.status(401).json({ message: "Not implemented" });
};

export const logout = async (req: Request, res: Response) => {
  return res.status(401).json({ message: "Not implemented" });
};
