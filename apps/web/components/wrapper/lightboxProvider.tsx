"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type Ctx = {
  openLightbox: (images: string[], startIndex?: number, showArrows?: boolean, showTumbails?: boolean) => void;
  closeLightbox: () => void;
  isOpen: boolean;
};

const LightboxCtx = createContext<Ctx>({
  openLightbox: () => {},
  closeLightbox: () => {},
  isOpen: false,
});

export const useLightbox = () => {
  const { openLightbox } = useContext(LightboxCtx);
  return openLightbox;
};

export const useLightboxState = (showThumbnails = true, showArrows = true) => useContext(LightboxCtx);

export function LightboxProvider({
  children,
  showThumbnails = true,
  showArrows = true,
}: {
  children: ReactNode;
  showThumbnails?: boolean;
  showArrows?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [arrows, setArrows] = useState<boolean>(showArrows);
  const [thumbnails, setThumbnails] = useState<boolean>(showThumbnails);

  useEffect(() => setMounted(true), []);

  const openLightbox = (images: string[], startIndex = 0, showArrows = true, showThumbnails = true) => {
    setArrows(showArrows);
    setThumbnails(showThumbnails);
    const filtered = images.filter(Boolean).map((src) => ({ src }));
    if (!filtered.length) return;
    setSlides(filtered);
    setIndex(Math.min(startIndex, filtered.length - 1));
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);

  const ctx = useMemo<Ctx>(() => ({ openLightbox, closeLightbox, isOpen: open }), [open]);

  // Gérer l'échappement avec la touche ESC et désactiver les autres dialogs
  //   useEffect(() => {
  //     const handleKeyDown = (event: KeyboardEvent) => {
  //       if (event.key === "Escape" && open) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //         event.stopImmediatePropagation();
  //         closeLightbox();
  //       }
  //     };

  //     if (open) {
  //       document.addEventListener("keydown", handleKeyDown, { capture: true });
  //       document.body.style.overflow = "hidden";

  //       // Désactiver tous les dialogs Radix UI
  //       const dialogs = document.querySelectorAll("[data-radix-popper-content-wrapper], [data-radix-dialog-overlay]");
  //       dialogs.forEach((dialog) => {
  //         (dialog as HTMLElement).style.pointerEvents = "none";
  //       });
  //     }

  //     return () => {
  //       document.removeEventListener("keydown", handleKeyDown, { capture: true });
  //       document.body.style.overflow = "unset";

  //       // Réactiver tous les dialogs Radix UI
  //       const dialogs = document.querySelectorAll("yarl__root yarl__portal");
  //       dialogs.forEach((dialog) => {
  //         (dialog as HTMLElement).style.zIndex = "9999";
  //       });
  //     };
  //   }, [open]);

  return (
    <LightboxCtx.Provider value={ctx}>
      {children}
      {mounted && open && (
        <>
          <div>
            <Lightbox
              portal={{
                root: document.body,
              }}
              render={{
                iconNext: () => (arrows ? <ChevronRightIcon className="w-10 h-10" /> : undefined),
                iconPrev: () => (arrows ? <ChevronLeftIcon className="w-10 h-10" /> : undefined),
              }}
              open={open}
              close={closeLightbox}
              slides={slides}
              index={index}
              //   toolbar={{
              //     buttons: [arrows ? "Précédent" : undefined, arrows ? "Suivant" : undefined],
              //   }}
              controller={{
                closeOnBackdropClick: true,
                closeOnPullDown: true,
                closeOnPullUp: true,
              }}
              plugins={[Zoom, ...(thumbnails ? [Thumbnails] : [])]}
              styles={{
                root: {
                  zIndex: 9999,
                },
                container: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                thumbnailsContainer: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            />
          </div>
        </>
      )}
    </LightboxCtx.Provider>
  );
}
