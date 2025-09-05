import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null, // utile avec BullMQ
});

// Logs connexion
redis.on("connect", () => {
  console.log("📡 Redis: tentative de connexion...");
});

redis.on("ready", () => {
  console.log("✅ Redis: connexion prête !");
});

redis.on("error", (err) => {
  console.error("❌ Redis: erreur de connexion", err);
});

redis.on("close", () => {
  console.warn("⚠️ Redis: connexion fermée");
});

redis.on("reconnecting", (time: number) => {
  console.log(`🔄 Redis: reconnexion dans ${time}ms`);
});
