import s3 from "@/config/s3Client.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";

export const generatePresignedUrl = async (req: Request, res: Response) => {
  // const userId = req.user?.userId || "";
  const timestamp = Date.now();
  const { imageFolder, imageName } = req.body;
  // const objectKey = `${userId}-${timestamp}.jpg`; // Génère un nom unique avec l'ID utilisateur et le timestamp

  // if (!objectKey) {
  //   res.status(400).json({ error: "objectKey est requis." });
  //   return;
  // }

  // Construction du chemin avec imageFolder optionnel
  let pathName = `uploads/`;
  if (imageFolder) {
    pathName += `${imageFolder}/`;
  }
  pathName += `${imageName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: pathName,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 1500 }); // URL valide pendant 1h

    res.json({ url: presignedUrl });
  } catch (error) {
    console.error("Erreur lors de la génération de la presigned URL :", error);
    res.status(500).json({ error: "Impossible de générer une presigned URL." });
  }
};
