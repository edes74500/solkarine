"use client";

import { useImageUpload } from "@/hooks/img/useImageUpload";
import { Upload } from "lucide-react";
import { useCallback } from "react";

interface DownloadImageProps {
  setUploadedImageUrl: (imageUrl: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
}

export default function DownloadImage({ setUploadedImageUrl, setIsUploading }: DownloadImageProps) {
  const { uploadToTempR2 } = useImageUpload();

  const handleDownloadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        const imageUrl = await uploadToTempR2(file);
        setUploadedImageUrl(imageUrl);
        setIsUploading(false);
      }
    },
    [uploadToTempR2, setUploadedImageUrl, setIsUploading],
  );

  return (
    <div className="cursor-pointer block !w-full !h-full flex items-center justify-center">
      <label htmlFor="image-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
        <div className="border border-dashed border-primary/50 rounded-lg p-2 text-center hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-2   h-full w-full bg-input">
          <Upload className="h-6 w-6 text-primary/70" />
          <span className="text-sm text-foreground/80 font-medium">Importer une image</span>
          <span className="text-xs text-muted-foreground">Formats acceptés: JPG, PNG, GIF, WebP</span>
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleDownloadImage}
          onClick={(e) => (e.currentTarget.value = "")}
        />
      </label>
    </div>
  );
}
