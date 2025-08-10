// jest.setup.ts
import dotenv from "dotenv";
import path from "node:path";

process.env.NODE_ENV = "test";
// (optionnel) on s'assure de repartir propre
delete process.env.MONGO_URI;

dotenv.config({
  path: path.join(__dirname, ".env.test"),
  override: true, // <-- remplace ce qui aurait été chargé avant
});
