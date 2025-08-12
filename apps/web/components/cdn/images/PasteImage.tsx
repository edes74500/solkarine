"use client";

import { usePasteImageAndUpload } from "@/hooks/img/usePasteImage";
import { usePasteZone } from "@/hooks/usePasteZone";
import { Clipboard, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PasteImageZoneProps {
  setUploadedImageUrl: (imageUrl: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
}

export default function PasteImageZone({ setUploadedImageUrl, setIsUploading }: PasteImageZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { handlePasteAndUpload, uploadedImageUrl } = usePasteImageAndUpload();
  const { isPasteActive, setIsPasteActive } = usePasteZone();
  const [hasUploaded, setHasUploaded] = useState(false);

  const handlePasteEvent = async (e: React.ClipboardEvent) => {
    // Empêcher les collages multiples
    if (hasUploaded) {
      e.preventDefault();
      return;
    }

    setIsUploading(true);
    await handlePasteAndUpload(e);
    setIsUploading(false);
    setIsPasteActive(false);
    setHasUploaded(true);

    // Désactiver le focus après le collage pour forcer l'utilisateur à recliquer
    if (ref.current) {
      ref.current.blur();
    }

    // Réinitialiser l'état après 1 seconde pour permettre un nouveau collage
    setTimeout(() => {
      setHasUploaded(false);
    }, 1000);
  };

  useEffect(() => {
    if (uploadedImageUrl) {
      setUploadedImageUrl(uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  // Réinitialiser l'état quand le composant est monté ou quand l'URL est réinitialisée
  useEffect(() => {
    setHasUploaded(false);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div
        ref={ref}
        tabIndex={0}
        onPaste={handlePasteEvent}
        onFocus={() => !hasUploaded && setIsPasteActive(true)}
        onBlur={() => setIsPasteActive(false)}
        className={`border border-dashed rounded-lg p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 w-full h-full bg-input ${
          isPasteActive && !hasUploaded
            ? "border-2 border-primary bg-primary/10 shadow-lg"
            : hasUploaded
              ? "border-green-500/50 bg-green-500/10"
              : "border-primary/50 hover:bg-primary/5 focus:outline-primary"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Clipboard className={`h-5 w-5 ${hasUploaded ? "text-green-500/70" : "text-primary/70"}`} />
          <Image className={`h-5 w-5 ${hasUploaded ? "text-green-500/70" : "text-primary/70"}`} />
        </div>
        <span className="text-sm text-foreground/80 font-medium text-center">
          {hasUploaded ? "Image collée avec succès" : "Coller une image depuis le presse-papiers"}
        </span>
        {!hasUploaded && (
          <span className="text-xs text-muted-foreground text-center">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+V</kbd> après capture d'écran
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">Win+Maj+S</kbd>
          </span>
        )}
        {isPasteActive && !hasUploaded && (
          <p className="text-xs mt-1 text-primary font-medium text-center">Mode collage actif</p>
        )}
      </div>
    </div>
  );
}
