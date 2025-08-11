"use client";

import { useLightbox } from "@/components/wrapper/lightboxProvider";
import { Loader2Icon, XIcon } from "lucide-react";
import { useMemo } from "react";

type Props = {
  fildValue: (string | undefined)[];
  isUploading: boolean;
  handleClearImageAction: (index: number) => void;
  showTumbails?: boolean;
  showDeleteButton?: boolean;
  showArrows?: boolean;
};

export default function ImagePreviewForm({
  fildValue,
  isUploading,
  handleClearImageAction,
  showTumbails = true,
  showDeleteButton = true,
  showArrows = true,
}: Props) {
  const openLightbox = useLightbox();

  // Construit une liste (src + index d'origine) en filtrant les undefined
  const entries = useMemo(
    () =>
      (fildValue ?? [])
        .map((src, originalIndex) => ({ src, originalIndex }))
        .filter((e): e is { src: string; originalIndex: number } => typeof e.src === "string" && e.src.length > 0),
    [fildValue],
  );

  // Slides pour le lightbox
  const slides = useMemo(() => entries.map((e) => e.src), [entries]);

  const openImageDialog = (index: number) => {
    openLightbox(slides, index, showArrows, showTumbails);
  };

  const hasContent = entries.length > 0 || isUploading;

  return hasContent ? (
    <div className="mt-2">
      <p className="text-sm font-medium mb-1">Aperçu de l'image:</p>

      {entries.length > 0 && (
        <div className="w-fit flex flex-wrap gap-2">
          {entries.map((e, i) => (
            <div key={e.originalIndex} className="relative max-w-[200px] max-h-[100px] overflow-hidden rounded-md">
              <img
                src={e.src}
                alt="Aperçu"
                className="max-w-[200px] max-h-[100px] rounded-md object-contain cursor-zoom-in transition-opacity duration-200"
                onClick={(ev) => {
                  ev.stopPropagation();
                  openImageDialog(i);
                }}
                onLoad={(ev) => ev.currentTarget.classList.remove("opacity-0")}
                onLoadStart={(ev) => ev.currentTarget.classList.add("opacity-0")}
              />

              {showDeleteButton && (
                <button
                  type="button"
                  onClick={() => handleClearImageAction(e.originalIndex)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs aspect-square w-6 h-6 shrink-0 flex items-center justify-center"
                  aria-label={`Supprimer l'image ${e.originalIndex + 1}`}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isUploading && (
        <div className="mt-2 rounded-md aspect-video max-h-[100px] h-full w-full flex items-center justify-center border border-dashed border-gray-300">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </div>
      )}
    </div>
  ) : null;
}
