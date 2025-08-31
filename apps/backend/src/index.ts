import { applyTimestampToLogs } from "@repo/utils";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import corsOptions from "./config/cors.config";
import { dbConnexion } from "./config/dbConnexion.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { routeLogger } from "./middlewares/routeLogger.middleware";
import router from "./routes";

dotenv.config({ quiet: true });
applyTimestampToLogs();

async function main() {
  const app = express();
  app.use(routeLogger);
  app.use(cors(corsOptions));

  // --- Redirection HTTP ➡ HTTPS en production ---
  // if (process.env.NODE_ENV === "production") {
  //   app.use((req, res, next) => {
  //     if (!req.secure && req.headers["x-forwarded-proto"] !== "https") {
  //       return res.redirect("https://" + req.headers.host + req.url);
  //     }
  //     next();
  //   });
  // }

  // --- Middlewares globaux ---
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());

  // --- Connexion à MongoDB ---
  await dbConnexion.connect();
  if (mongoose.connection.db) {
    const coll = mongoose.connection.db.collection("dungeons");
    const idx = await coll.indexes();
    console.table(
      idx.map((i) => ({
        name: i.name,
        key: JSON.stringify(i.key),
        expireAfterSeconds: i.expireAfterSeconds ?? null,
      })),
    );
  }
  console.log("Connexion à MongoDB réussie");
  // helper to auto-catch errors on async handlers
  const wrapAsync = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.use("/api/v1", wrapAsync(router));

  app.use(errorHandler);
  app.set("trust proxy", 1);
  const port = process.env.PORT || 5000;

  // --- Démarrage du serveur ---
  app.listen(Number(port), "0.0.0.0", () => {
    console.info(`🚀 Serveur démarré sur le port ${port}`);
  });
}

main();
