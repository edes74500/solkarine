import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";
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
  //   isLightboxOpen: boolean;
}

export default function YetAnotherLightBox({ open, close, slides, index, showArrows, showThumbnails }: Props) {
  const formattedSlides = useMemo(() => {
    if (!slides) return [];

    if (typeof slides === "string") {
      return [
        {
          src: slides,
          //   alt: slides,
        },
      ];
    }

    return slides
      .filter((slide): slide is string => typeof slide === "string" && slide !== "")
      .map((slide) => ({
        src: slide,
        // alt: slide,
      }));
  }, [slides]);

  return (
    <Lightbox
      portal={{
        root: document.body,
      }}
      render={{
        iconNext: () => (showArrows ? <ChevronRightIcon className="w-10 h-10" /> : undefined),
        iconPrev: () => (showArrows ? <ChevronLeftIcon className="w-10 h-10" /> : undefined),
      }}
      open={open}
      close={close}
      slides={formattedSlides}
      index={index}
      carousel={{ finite: true }}
      thumbnails={{ position: "bottom" }}
      //   toolbar={{
      //     buttons: [arrows ? "Précédent" : undefined, arrows ? "Suivant" : undefined],
      //   }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: true,
      }}
      plugins={[Zoom, ...(showThumbnails ? [Thumbnails] : [])]}
      styles={{
        // root: {
        //   zIndex: 9999,
        // },
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        thumbnailsContainer: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    />
  );
}
