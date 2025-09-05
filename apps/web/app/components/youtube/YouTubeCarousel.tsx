"use client";

import VideoCardCarousel from "@/app/components/youtube/VideoCardCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

export default function YouTubeCarousel({ videos }: { videos: Video[] }) {
  if (!videos?.length) return null;

  return (
    <div className="w-full relative py-6">
      {/* ✅ Hauteur explicite du viewport du carrousel */}
      <div className="h-[280px]">
        {/* ✅ Forcer 100% sur wrapper & slide */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
            1280: { slidesPerView: 3, spaceBetween: 16 },
          }}
          className="h-full [&_.swiper-wrapper]:h-full [&_.swiper-slide]:h-full overflow-hidden"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id} className="!h-full flex">
              {/* ✅ le contenu doit aussi étirer */}
              <div className="h-full w-full">
                <VideoCardCarousel video={video} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Boutons nav (peuvent rester en dehors du conteneur height) */}
      <button className="swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
        <ChevronLeft size={24} />
      </button>
      <button className="swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
