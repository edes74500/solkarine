import { applyTimestampToLogs } from "@repo/utils";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import corsOptions from "./config/cors.config";
import { dbConnexion } from "./config/dbConnexion.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { routeLogger } from "./middlewares/routeLogger.middleware";

dotenv.config({ quiet: true });
applyTimestampToLogs();

async function main() {
  const app = express();

  // --- Redirection HTTP ➡ HTTPS en production ---
  if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
      if (!req.secure && req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("https://" + req.headers.host + req.url);
      }
      next();
    });
  }

  // --- Middlewares globaux ---
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(routeLogger);

  // --- Connexion à MongoDB ---
  await dbConnexion.connect();

  app.use(errorHandler);

  // --- Démarrage du serveur ---
  app.listen(process.env.PORT || 3000, () => {
    console.info(`🚀 Serveur démarré sur le port ${process.env.PORT || 3000}`);
  });
}

main();
