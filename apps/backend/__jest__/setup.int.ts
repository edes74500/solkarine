import mongoose from "mongoose";
import { dbConnexion } from "../src/config/dbConnexion.config";

beforeAll(async () => {
  await dbConnexion.connect();
});

// afterEach(async () => {
//   // purge des collections entre tests
//   const colls = await mongoose.connection.db?.collections();
//   for (const c of colls || []) await c.deleteMany({});
// });

afterAll(async () => {
  // optionnel mais propre par worker
  await mongoose.connection.dropDatabase();
  await dbConnexion.disconnect();
});
