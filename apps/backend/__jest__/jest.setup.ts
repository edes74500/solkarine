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

// suffixe la DB pour isoler chaque worker: mydb_int_test_w1, _w2, ...
if (process.env.MONGO_URI) {
  const u = new URL(process.env.MONGO_URI);
  const base = u.pathname.slice(1).split("?")[0];
  const wid = process.env.JEST_WORKER_ID ?? "1";
  u.pathname = `/${base}_w${wid}`;
  process.env.MONGO_URI = u.toString();
  process.env.TEST_DB_NAME = `${base}_w${wid}`;
}
