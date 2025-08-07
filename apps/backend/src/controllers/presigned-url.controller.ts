import s3 from "@/config/s3Client.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

export const generatePresignedUrl = async (req: Request, res: Response) => {
  // const userId = req.user?.userId || "";
  const timestamp = Date.now();
  const { imageFolder, imageName } = req.body;
  // const objectKey = `${userId}-${timestamp}.jpg`; // Génère un nom unique avec l'ID utilisateur et le timestamp

  // if (!objectKey) {
  //   res.status(400).json({ error: "objectKey est requis." });
  //   return;
  // }

  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    console.error("Bucket name is not defined.");
    res.status(500).json({ error: "Bucket name is not defined." });
    return;
  }

  // Construction du chemin avec imageFolder optionnel
  let pathName = `uploads/`;
  if (imageFolder) {
    pathName += `${imageFolder}/`;
  }
  pathName += `${imageName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: pathName,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 1500 }); // URL valide pendant 1h

    res.json({ url: presignedUrl });
  } catch (error) {
    console.error("Erreur lors de la génération de la presigned URL :", error);
    res.status(500).json({ error: "Impossible de générer une presigned URL." });
  }
};
