"use client";

import { CalendarIcon, PlayCircleIcon } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type Video = {
  id: string;
  title: string;
  description?: string;
  publishedAt: string;
  thumbnail: string;
  channelId?: string;
  channelTitle?: string;
  views?: number;
  likes?: number;
  comments?: number;
};

export default function VideoCardCarousel(props: { video: Video }) {
  const { video } = props;

  // Formatage de la date pour un affichage plus détaillé
  const formattedDate = new Date(video.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-lg  border  shadow-md bg-card backdrop-blur-sm transition-all duration-300 hover:shadow-lg  h-full grow overflow-hidden">
      <div className="relative aspect-video">
        <LiteYouTubeEmbed id={video.id} title={video.title} noCookie adNetwork={false} poster="maxresdefault" webp />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg transform hover:scale-110 transition-transform" />
        </div> */}
      </div>
      <div className="p-4 space-y-2 bg-gradient-to-b from-card to-card/90 flex flex-col justify-between">
        {/* <div className="flex flex-col gap-2 grow line-clamp-1"> */}
        <h5 className="font-medium line-clamp-1 text-card-foreground text-sm line-clamp-1">{video.title}</h5>
        {/* </div> */}
        <div className="flex items-center justify-between text-xs ">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PlayCircleIcon className="w-3.5 h-3.5" />
            <span>{video.views} vues</span>
          </div>
        </div>
      </div>
    </div>
  );
}
