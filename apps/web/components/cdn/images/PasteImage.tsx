"use client";

import { usePasteImageAndUpload } from "@/hooks/img/usePasteImage";
import { usePasteZone } from "@/hooks/usePasteZone";
import { useEffect, useRef } from "react";

interface PasteImageZoneProps {
  setUploadedImageUrl: (imageUrl: string | null) => void;
}

export default function PasteImageZone({ setUploadedImageUrl }: PasteImageZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { handlePasteAndUpload, uploadedImageUrl } = usePasteImageAndUpload();
  const { isPasteActive, setIsPasteActive } = usePasteZone();

  const handlePasteEvent = (e: React.ClipboardEvent) => {
    handlePasteAndUpload(e);
  };

  useEffect(() => {
    if (uploadedImageUrl) {
      setUploadedImageUrl(uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  return (
    <div className="space-y-4 w-full justify-center items-center">
      <div
        ref={ref}
        tabIndex={0}
        onPaste={handlePasteEvent}
        onFocus={() => setIsPasteActive(true)}
        onBlur={() => setIsPasteActive(false)}
        className={`border justify-center items-center border-dashed p-4 rounded cursor-pointer transition-all duration-300 text-center ${
          isPasteActive ? "border-2 border-primary bg-primary/10 shadow-lg" : "border-primary focus:outline-primary"
        }`}
      >
        <span className="text-center w-full">
          Clique ici puis <b>Ctrl+V</b> après <b>Win+Maj+S</b> pour coller une capture.
          {isPasteActive && (
            <p className="text-sm mt-1 text-primary">Mode collage actif. Retirer le focus pour annuler.</p>
          )}
        </span>
      </div>
    </div>
  );
}
