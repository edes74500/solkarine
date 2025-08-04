// jest.setup.ts
import dotenv from "dotenv";
// toujours charger .env.test quand on est dans un contexte Jest
dotenv.config({ path: ".env.test" });
