"use client";

import YetAnotherLightBox from "@/components/cdn/images/YetAnotherLightBox";
import { Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  fieldValue: string[] | string | undefined | (string | undefined)[];
  isUploading: boolean;
  handleClearImageAction: (index: number) => void;
  showTumbails?: boolean;
  showDeleteButton?: boolean;
  showArrows?: boolean;
  isLightboxOpen: boolean;
  setIsLightboxOpenAction: (isLightboxOpen: boolean) => void;
};

export default function ImagePreviewForm({
  fieldValue,
  isUploading,
  handleClearImageAction,
  showTumbails = true,
  showDeleteButton = true,
  showArrows = true,
  isLightboxOpen,
  setIsLightboxOpenAction,
}: Props) {
  const [index, setIndex] = useState(0);

  // Normalisation des valeurs pour éviter les erreurs TypeScript et trim des valeurs
  const normalizedFieldValue = useMemo(() => {
    if (!fieldValue) return [];
    const values = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
    return values
      .filter(Boolean)
      .map((val) => (typeof val === "string" ? val.trim() : val))
      .filter((val) => val !== "");
  }, [fieldValue]);

  // Réinitialiser l'index si nécessaire quand fieldValue change
  useEffect(() => {
    if (index >= normalizedFieldValue.length && normalizedFieldValue.length > 0) {
      setIndex(normalizedFieldValue.length - 1);
    }
  }, [normalizedFieldValue, index]);

  const openLightbox = (index: number) => {
    setIsLightboxOpenAction(true);
    setIndex(index);
  };

  const closeLightbox = () => setIsLightboxOpenAction(false);

  const hasContent = normalizedFieldValue.length > 0 || isUploading;

  if (!hasContent) return null;

  return (
    <div className="mt-2">
      <p className="text-sm font-medium mb-1">Aperçu de l'image:</p>
      {isUploading && (
        <div className="my-5 bg-input rounded-md border border-primary/30 shadow-sm p-4 flex items-center justify-center gap-3">
          <Loader2Icon className="w-5 h-5 text-primary animate-spin" />
          <span className="text-sm font-medium text-foreground/80">Téléchargement en cours...</span>
        </div>
      )}

      {normalizedFieldValue.length > 0 && (
        <div className="w-fit flex flex-wrap gap-2">
          {normalizedFieldValue.map((e, i) => (
            <div key={`img-${i}-${e}`} className="relative max-w-[200px] max-h-[100px] overflow-hidden rounded-md">
              <img
                src={e}
                alt="Aperçu"
                className="max-w-[200px] max-h-[100px] rounded-md object-contain cursor-zoom-in transition-opacity duration-200"
                onClick={(ev) => {
                  ev.stopPropagation();
                  openLightbox(i);
                }}
                onLoad={(ev) => ev.currentTarget.classList.remove("opacity-0")}
                onLoadStart={(ev) => ev.currentTarget.classList.add("opacity-0")}
              />

              {showDeleteButton && (
                <button
                  type="button"
                  onClick={() => handleClearImageAction(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs aspect-square w-6 h-6 shrink-0 flex items-center justify-center cursor-pointer"
                  aria-label={`Supprimer l'image ${i + 1}`}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <YetAnotherLightBox
        open={isLightboxOpen}
        close={closeLightbox}
        slides={normalizedFieldValue}
        index={index}
        showArrows={showArrows}
        showThumbnails={showTumbails}
      />
    </div>
  );
}
