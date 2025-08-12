import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.R2_ENDPOINT) {
  console.error("Erreur: R2_ENDPOINT n'est pas défini");
}

if (!process.env.R2_ACCESS_KEY_ID) {
  console.error("Erreur: R2_ACCESS_KEY_ID n'est pas défini");
}

if (!process.env.R2_ACCESS_KEY_SECRET) {
  console.error("Erreur: R2_ACCESS_KEY_SECRET n'est pas défini");
}

const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: process.env.R2_REGION, // Région R2
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "", // Clé d'accès depuis .env
    secretAccessKey: process.env.R2_ACCESS_KEY_SECRET || "", // Clé secrète depuis .env
  },
  forcePathStyle: process.env.NODE_ENV === "test", // indispensable pour MinIO en environnement de test
});

export default s3;
