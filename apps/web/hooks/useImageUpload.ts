// ✅ Correction du useImageUpload hook
import { useUploadImageWithPresignedUrlMutation } from "@/redux/api/cdn.apiSlice";
import { toast } from "sonner";

interface UseImageUploadProps {
  file?: File | null;
}

export function useImageUpload({ file }: UseImageUploadProps = {}) {
  const [uploadImageWithPresignedUrl, { isLoading }] = useUploadImageWithPresignedUrlMutation();

  // ✅ Fonction pour uploader avec un nom personnalisé
  const uploadUrl = async (fileToUpload: File, customName?: string): Promise<string | null> => {
    if (!fileToUpload) return null;

    try {
      const fileName = customName
        ? `${customName}.${fileToUpload.name.split(".").pop()}`
        : `route_${Date.now()}.${fileToUpload.name.split(".").pop()}`;

      const response = await uploadImageWithPresignedUrl({
        file: fileToUpload,
        imageFolder: "routes",
        imageName: fileName,
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
    uploadUrl, // ✅ Fonction, pas string
  };
}
