import s3 from "@/config/s3Client.config";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export const setImageToFolderInR2 = async ({
  imageUrl,
  folder,
  imageName,
}: {
  imageUrl: string | undefined | string[];
  folder: string;
  imageName: string;
}): Promise<string | string[]> => {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not defined");
  }

  if (!imageUrl || imageUrl.length === 0) {
    console.info("No image url provided");
    return [];
  }

  const bucketUrl = process.env.R2_BUCKET_URL;
  if (!bucketUrl) {
    throw new Error("R2_BUCKET_URL is not defined");
  }

  console.info(`Début du traitement des images pour le dossier: ${folder}`);

  // Convertir en tableau même si c'est une seule URL
  const imageUrls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  console.info(`Nombre d'images à traiter: ${imageUrls.length}`);

  const promises = imageUrls.map(async (url, index) => {
    if (!url) return null;

    const imgExtension = url.split(".").pop() || "png";
    const newImgName = `${uuidv4().slice(0, 10)}_${imageName}_${index}`;
    const imagePath = `uploads/${folder}/${newImgName}.${imgExtension}`;

    console.info(`Traitement de l'image ${index + 1}/${imageUrls.length}: ${newImgName}.${imgExtension}`);

    let tmpKeyUrl: string | undefined;
    if (url.includes(bucketUrl)) {
      tmpKeyUrl = url.split(bucketUrl + "/").pop();
      console.info(`Image source détectée dans le bucket: ${tmpKeyUrl}`);
    } else {
      tmpKeyUrl = url;
      console.info(`Image source externe: ${url}`);
    }

    if (!tmpKeyUrl) {
      throw new Error(`Tmp key url is not defined for image ${index}`);
    }

    console.info(`Copie de l'image vers: ${imagePath}`);
    await s3.send(
      new CopyObjectCommand({
        Bucket: bucketName,
        CopySource: encodeURI(`${bucketName}/${tmpKeyUrl}`),
        Key: imagePath,
        MetadataDirective: "COPY",
      }),
    );
    console.info(`Image copiée avec succès: ${imagePath}`);

    return `${bucketUrl}/${imagePath}`;
  });

  const results = await Promise.all(promises);
  const filteredResults = results.filter((url) => url !== null) as string[];

  console.info(`Traitement terminé: ${filteredResults.length} images traitées avec succès`);

  // Retourner un tableau ou une chaîne selon le type d'entrée
  return Array.isArray(imageUrl) ? filteredResults : filteredResults[0];
};

export const deleteImageFromR2 = async (imageUrl: string | string[]): Promise<boolean> => {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not defined");
  }

  const bucketUrl = process.env.R2_BUCKET_URL;
  if (!bucketUrl) {
    throw new Error("R2_BUCKET_URL is not defined");
  }

  console.info("Début de la suppression d'images");

  // Convertir en tableau même si c'est une seule URL
  const imageUrls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  console.info(`Nombre d'images à supprimer: ${imageUrls.length}`);

  try {
    const promises = imageUrls.map(async (url, index) => {
      if (!url) {
        console.info(`Image ${index + 1}: URL vide, ignorée`);
        return false;
      }

      const key = url.split(bucketUrl + "/").pop();
      console.info(`Image ${index + 1}: Clé extraite: ${key}`);

      if (!key) {
        console.info(`Image ${index + 1}: Impossible d'extraire la clé, suppression ignorée`);
        return false;
      }

      console.info(`Suppression de l'image: ${key}`);
      await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
      console.info(`Image supprimée avec succès: ${key}`);
      return true;
    });

    const results = await Promise.all(promises);
    const successCount = results.filter((result) => result).length;
    console.info(`Suppression terminée: ${successCount}/${imageUrls.length} images supprimées avec succès`);
    return results.every((result) => result === true);
  } catch (error) {
    console.error("Erreur lors de la suppression des images:", error);
    return false;
  }
};
