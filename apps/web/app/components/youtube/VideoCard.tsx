"use client";

import { CalendarIcon, PlayCircleIcon } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function VideoCard({ id, title, publishedAt }: { id: string; title: string; publishedAt: string }) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-md border border-pink-300/30 shadow-md bg-card backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] h-full overflow-hidden">
      <div className="relative">
        <LiteYouTubeEmbed
          id={id}
          title={title}
          noCookie
          adNetwork={false}
          poster="hqdefault" // "maxresdefault" peut 404 selon la vidéo
          webp
        />
        {/* Overlay purement visuel, ne consomme pas les clics */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="p-3 space-y-2 bg-gradient-to-b from-card to-card/90">
        <h5 className="font-semibold line-clamp-2 text-card-foreground text-sm tracking-tight">{title}</h5>
        <div className="flex items-center gap-1.5 text-xs text-pink-300/80">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
