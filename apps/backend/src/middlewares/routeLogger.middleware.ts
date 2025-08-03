import { NextFunction, Request, Response } from "express";

export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  // Ne pas logger les requêtes OPTIONS (préflight CORS)
  if (req.method !== "OPTIONS") {
    const emoji = getMethodEmoji(req.method);
    console.info(`🚗 => ${emoji} ${req.method} ${req.url}`);
  }
  next();
};

/**
 * Retourne une émoticône adaptée à la méthode HTTP
 */
function getMethodEmoji(method: string): string {
  switch (method.toUpperCase()) {
    case "GET":
      return "🔍"; // Loupe pour recherche/lecture
    case "POST":
      return "➕"; // Plus pour création
    case "PUT":
      return "🔄"; // Flèches circulaires pour mise à jour complète
    case "PATCH":
      return "✏️"; // Crayon pour modification partielle
    case "DELETE":
      return "🗑️"; // Corbeille pour suppression
    case "HEAD":
      return "👀"; // Yeux pour vérification sans contenu
    default:
      return "🚀"; // Fusée comme fallback pour autres méthodes
  }
}
