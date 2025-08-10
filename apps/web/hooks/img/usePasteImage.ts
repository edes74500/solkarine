import { useImageUpload } from "@/hooks/img/useImageUpload";
import { useCallback, useState } from "react";

interface UsePasteImageReturn {
  handlePasteAndUpload: (e: React.ClipboardEvent) => Promise<void>;
  uploadedImageUrl: string | null;
  // clearImage: () => void;
}

export function usePasteImageAndUpload(): UsePasteImageReturn {
  const { uploadToTempR2 } = useImageUpload();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handlePasteAndUpload = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    // console.log(items);
    if (!items) return;

    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const pastedFile = item.getAsFile();

        if (pastedFile) {
          console.log("Image collée détectée:", {
            nom: pastedFile.name,
            type: pastedFile.type,
            taille: `${(pastedFile.size / 1024).toFixed(2)} KB`,
          });
          const imageUrl = await uploadToTempR2(pastedFile);
          if (imageUrl) {
            setUploadedImageUrl(imageUrl);
          }
        }
      }
    }
  }, []);

  // const clearImage = useCallback(() => {
  //   // Cette fonction est maintenant gérée par le composant parent
  // }, []);

  return {
    handlePasteAndUpload,
    uploadedImageUrl,
    // clearImage,
  };
}
