"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type Ctx = {
  openLightbox: (images: string[], startIndex?: number) => void;
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

export const useLightboxState = () => useContext(LightboxCtx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openLightbox = (images: string[], startIndex = 0) => {
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
      {mounted &&
        open &&
        createPortal(
          <div>
            <Lightbox
              open={open}
              close={closeLightbox}
              slides={slides}
              index={index}
              controller={{
                closeOnBackdropClick: true,
                closeOnPullDown: true,
                closeOnPullUp: true,
              }}
              plugins={[Zoom, Thumbnails]}
              styles={{
                container: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                thumbnailsContainer: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            />
          </div>,
          document.body,
        )}
    </LightboxCtx.Provider>
  );
}
