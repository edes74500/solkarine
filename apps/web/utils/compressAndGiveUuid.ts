import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

/**
 * Compresse une image pour réduire sa taille
 * @param file - Le fichier image à compresser
 * @param name: string - Nom de base pour le fichier
 * @param maxSizeMB - Taille maximale en MB (par défaut 1MB)
 * @param maxWidthOrHeight - Largeur ou hauteur maximale en pixels (par défaut 1920px)
 * @returns Le fichier image compressé
 */
export async function compressAndGiveUuid(
  file: File,
  // name: string | null = null,
  maxSizeMB: number = 0.4,
  maxWidthOrHeight: number = 1920,
): Promise<File> {
  try {
    const options = {
      maxSizeMB,
      quality: 1,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    const compressedFile = await imageCompression(file, options);

    console.log(`Compression d'image réussie:
      - Taille originale: ${(file.size / 1024 / 1024).toFixed(2)} MB
      - Taille compressée: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB
      - Taux de compression: ${((1 - compressedFile.size / file.size) * 100).toFixed(2)}%`);

    // Créer un nouveau File avec le nom personnalisé
    const renamedFile = new File([compressedFile], `${uuidv4()}.${compressedFile.type.split("/")[1]}`, {
      type: compressedFile.type,
    });

    return renamedFile;
  } catch (error) {
    console.error("Erreur lors de la compression de l'image:", error);
    throw new Error("La compression de l'image a échoué");
  }
}
