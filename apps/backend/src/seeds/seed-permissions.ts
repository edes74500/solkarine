import { Permission } from "@/models/auth/permission.model";
import { CATALOG } from "@/utils/flattenPermisson.utils";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/app";
  await mongoose.connect(uri);
  console.log(`Connected to ${uri}`);

  // Upsert chaque permission du catalogue
  const ops = CATALOG.map((name) => ({
    updateOne: {
      filter: { name },
      update: { $setOnInsert: { name }, $set: { updatedAt: new Date() } },
      upsert: true,
    },
  }));
  const bulk = await Permission.bulkWrite(ops, { ordered: false });
  console.log(`Upserted/Matched:`, {
    upserted: bulk.upsertedCount,
    matched: bulk.matchedCount,
    modified: bulk.modifiedCount,
  });

  // (Optionnel) Supprimer les permissions qui ne sont plus dans le catalogue
  if (process.env.SEED_DELETE_STALE === "true") {
    const res = await Permission.deleteMany({ name: { $nin: CATALOG } });
    console.log(`Deleted stale permissions: ${res.deletedCount}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
