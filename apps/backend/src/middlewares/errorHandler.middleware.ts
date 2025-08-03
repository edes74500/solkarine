import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("⚠️⚠️ Erreur interceptée ⚠️⚠️");
  console.error(`🔴 Type d'erreur: ${err.name}`);
  console.error(`🔴 Message: ${err.message}`);
  console.error(`🔴 URL: ${req.originalUrl}`);
  console.error(`🔴 Méthode: ${req.method}`);

  // Gestion des erreurs de token
  if (err.name === "TokenExpiredError") {
    console.error("🔴 Token expiré");
    res.status(401).json({ message: "Token expiré" });
    return;
  }

  if (err.name === "JsonWebTokenError") {
    console.error("🔴 Token invalide");
    res.status(403).json({ message: "Token invalide" });
    return;
  }

  // Gestion des erreurs d'application
  if (err.name === "AppError" && "status" in err) {
    console.error(`🔴 Erreur d'application: ${err.message}`);
    res.status((err as any).status).json({
      status: (err as any).status,
      success: false,
      message: err.message || "Erreur interne du serveur",
    });
    return;
  }

  // Erreur par défaut
  console.error("🔴 Erreur non gérée:", err);
  res.status(500).json({ message: "Une erreur est survenue", error: err.message });
};
