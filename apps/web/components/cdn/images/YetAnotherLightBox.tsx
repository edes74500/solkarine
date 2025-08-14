"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface Props {
  open: boolean;
  close: () => void;
  slides: (string | undefined)[] | string | undefined;
  index: number;
  showArrows: boolean;
  showThumbnails: boolean;
}

export default function YetAnotherLightBox({ open, close, slides, index, showArrows, showThumbnails }: Props) {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    // côté client uniquement
    setPortalReady(true);
  }, []);

  const formattedSlides = useMemo(() => {
    if (!slides) return [];
    if (typeof slides === "string") return [{ src: slides }];
    return slides.filter((s): s is string => typeof s === "string" && s !== "").map((s) => ({ src: s }));
  }, [slides]);

  return (
    <Lightbox
      // ne passe portal que quand document est dispo
      portal={portalReady ? { root: document.body } : undefined}
      render={{
        iconNext: () => (showArrows ? <ChevronRightIcon className="w-10 h-10" /> : undefined),
        iconPrev: () => (showArrows ? <ChevronLeftIcon className="w-10 h-10" /> : undefined),
      }}
      open={open}
      close={close}
      slides={formattedSlides}
      index={index}
      // carousel={{ finite: true }}
      thumbnails={{ position: "bottom" }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: true,
      }}
      plugins={[Zoom, ...(showThumbnails ? [Thumbnails] : [])]}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
      }}
    />
  );
}
