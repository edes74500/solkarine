// ✅ Correction du useImageUpload hook
import { useUploadImagetoTempR2WithPresignedUrlMutation } from "@/redux/api/cdn.apiSlice";
import { compressAndGiveUuid } from "@/utils/compressAndGiveUuid";
import { toast } from "sonner";

interface UseImageUploadProps {
  file?: File | null;
}

export function useImageUpload({ file }: UseImageUploadProps = {}) {
  const [uploadImageWithPresignedUrl, { isLoading }] = useUploadImagetoTempR2WithPresignedUrlMutation();

  // ✅ Fonction pour uploader avec un nom personnalisé
  const uploadToTempR2 = async (fileToUpload: File): Promise<string | null> => {
    if (!fileToUpload) return null;
    try {
      const compressedFile = await compressAndGiveUuid(fileToUpload);

      const response = await uploadImageWithPresignedUrl({
        file: compressedFile,
        imageName: compressedFile.name,
      });

      return response.data || null;
    } catch (error) {
      toast.error("Erreur lors de l'upload");
      console.error("Erreur lors de l'upload:", error);
      return null;
    }
  };

  return {
    isLoading,
    uploadToTempR2, // ✅ Fonction, pas string
  };
}
