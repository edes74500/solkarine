import { verifyJwtAccessToken } from "@/services/auth/jwt.service";
import { NextFunction, Request, Response } from "express";

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("No token");
    return res.status(401).json({ message: "No token" });
  }
  const decoded = await verifyJwtAccessToken(token);
  if (typeof decoded === "string") {
    return res.status(401).json({ message: "Invalid token" });
  }
  console.log(decoded);
  next();
};
