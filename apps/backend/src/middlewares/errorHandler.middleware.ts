import { UnauthorizedError } from "@/errors/UnauthorisedError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("⚠️⚠️ Erreur interceptée ⚠️⚠️");
  console.error(`🔴 Type d'erreur: ${err.name}`);
  console.error(`🔴 Message: ${err.message}`);
  console.error(`🔴 URL: ${req.originalUrl}`);
  console.error(`🔴 Méthode: ${req.method}`);

  // Gestion des erreurs de token
  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // Erreur par défaut
  console.error("🔴 Erreur non gérée:", err);
  res.status(500).json({ message: "Une erreur est survenue", error: err.message });
};
