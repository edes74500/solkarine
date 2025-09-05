"use client";

import { CalendarIcon, MessageSquareIcon, PlayCircleIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function VideoCard({
  video,
}: {
  video: {
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
}) {
  const formattedDate = new Date(video.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <LiteYouTubeEmbed
          id={video.id}
          title={video.title}
          noCookie
          adNetwork={false}
          poster="hqdefault"
          webp
          wrapperClass="yt-lite rounded-t-lg"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg transform hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="py-3 px-5">
        <div className="flex items-start gap-4">
          {video.thumbnail && (
            <div className="rounded-full aspect-square shrink-0 overflow-hidden border-2 border-primary/20">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={56}
                height={56}
                className="rounded-full object-cover aspect-square hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <div className="space-y-2">
            <div>
              <h5 className="font-semibold line-clamp-2 text-card-foreground text-lg">{video.title}</h5>
              {/* <p className="font-semibold text-muted-foreground line-clamp-2">{video.channelTitle}</p> */}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs mt-3">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PlayCircleIcon className="w-3.5 h-3.5" />
                <span>{video.views} vues</span>
              </div>
              {video.likes && (
                <div className="flex items-center gap-1.5">
                  <ThumbsUpIcon className="w-3.5 h-3.5" />
                  <span>{video.likes}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MessageSquareIcon className="w-3.5 h-3.5" />
                <span>{video.comments ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
