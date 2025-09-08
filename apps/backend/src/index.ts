import { applyTimestampToLogs } from "@repo/utils";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";
import { dbConnexion } from "./config/dbConnexion.config";

dotenv.config({ quiet: true });
applyTimestampToLogs();

async function bootstrap() {
  // connexion DB
  await dbConnexion.connect();

  const port = process.env.PORT || 5000;
  app.listen(Number(port), () => {
    console.info(`🚀 Serveur démarré sur le port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Erreur critique au démarrage :", err);
  mongoose.disconnect();
  process.exit(1);
});
