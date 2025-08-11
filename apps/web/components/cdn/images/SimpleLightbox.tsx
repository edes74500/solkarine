"use client";

import { Dialog, DialogContent } from "@repo/ui/components/dialog";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  slides: string[] | string | undefined;
  selectedImageIndex: number;
  isLightboxOpen: boolean;
  setIsLightboxOpenAction: (isOpen: boolean) => void;
  setSelectedImageIndexAction: (index: number | ((prev: number) => number)) => void;
};

export default function SimpleLightbox({
  slides,
  selectedImageIndex,
  isLightboxOpen,
  setIsLightboxOpenAction,
  setSelectedImageIndexAction,
}: Props) {
  //   const [dialogOpen, setDialogOpen] = useState(false);
  //   const [index, setIndex] = useState(selectedImageIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Normalisation des slides pour gérer tous les cas possibles
  const normalizedSlides = Array.isArray(slides) ? slides : typeof slides === "string" ? [slides] : [];

  const slidesCount = normalizedSlides.length;

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndexAction((prev: number) => (prev > 0 ? prev - 1 : slidesCount - 1));
    } else {
      setSelectedImageIndexAction((prev: number) => (prev < slidesCount - 1 ? prev + 1 : 0));
    }
  };

  // Gestion du swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe vers la gauche -> image suivante
        navigateImage("next");
      } else {
        // Swipe vers la droite -> image précédente
        navigateImage("prev");
      }
    }

    // Réinitialiser les valeurs
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpenAction}>
      <DialogContent
        className="!max-w-full !h-screen !w-screen !p-0 !m-0 !rounded-none bg-black/30 flex items-center justify-center !border-none "
        showCloseButton={false}
        onInteractOutside={(e) => {
          if (isLightboxOpen) {
            e.preventDefault();
          }
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => {
            // Si le clic est sur le conteneur et non sur un élément enfant
            if (e.target === e.currentTarget) {
              setIsLightboxOpenAction(false);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {normalizedSlides[selectedImageIndex] && (
            <img
              src={normalizedSlides[selectedImageIndex]}
              alt="Image agrandie"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          )}

          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>

          <button
            onClick={() => setIsLightboxOpenAction(false)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Fermer"
          >
            <XIcon className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {selectedImageIndex + 1} / {slidesCount}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
