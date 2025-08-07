import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  endpoint: "https://a1c984e21a682e4c63eb50270ee07eb4.r2.cloudflarestorage.com",
  region: "weur", // Région R2
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "", // Clé d'accès depuis .env
    secretAccessKey: process.env.R2_ACCESS_KEY_SECRET || "", // Clé secrète depuis .env
  },
});

export default s3;
