"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function VideoCardCarousel(props: { id: string; title: string; publishedAt: string }) {
  const { id, title, publishedAt } = props;

  // Formatage de la date pour un affichage plus détaillé
  const formattedDate = new Date(publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl  border border-pink-300/30 shadow-md bg-card backdrop-blur-sm transition-all duration-300 hover:shadow-lg  h-full grow -mr-1 overflow-hidden">
      <div className="relative aspect-video">
        <LiteYouTubeEmbed id={id} title={title} noCookie adNetwork={false} poster="maxresdefault" webp />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg transform hover:scale-110 transition-transform" />
        </div> */}
      </div>
      <div className="p-4 space-y-2 bg-gradient-to-b from-card to-card/90">
        <h5 className="font-medium line-clamp-2 text-card-foreground text-sm">{title}</h5>
        {/* <div className="flex items-center gap-1.5 text-xs text-pink-300/80">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div> */}
      </div>
    </div>
  );
}
