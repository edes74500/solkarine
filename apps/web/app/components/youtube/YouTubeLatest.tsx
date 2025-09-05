// components/youtube/YouTubeLatest.tsx
import { getYoutubeLatest } from "@/lib/api/youtube";
import { XMLParser } from "fast-xml-parser";
import { FaYoutube } from "react-icons/fa";
import VideoCard from "./VideoCard"; // <-- client component
import YouTubeCarousel from "./YouTubeCarousel"; // <-- client component

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

/** Résout un handle @xxxx → channelId UCxxxx sans API (HTML public) */
async function handleToChannelId(handle: string, revalidateSeconds = 1800): Promise<string | null> {
  const h = handle.startsWith("@") ? handle : `@${handle}`;
  const res = await fetch(`https://www.youtube.com/${h}`, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) return null;
  const html = await res.text();

  const m1 = html.match(/"channelId":"(UC[0-9A-Za-z_-]{22})"/);
  if (m1) return m1[1];

  const m2 = html.match(/youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})/);
  if (m2) return m2[1];

  return null;
}

async function fetchLastVideosByChannelId(channelId: string, limit = 6): Promise<Video[]> {
  // Récupérer les données depuis l'API
  const youtubeData = await getYoutubeLatest();

  if (youtubeData.success && youtubeData.data.length > 0) {
    return youtubeData.data.map((video) => ({
      id: video.id,
      title: video.title,
      publishedAt: video.publishedAt,
      views: video.views,
      thumbnail: video.thumbnail,
      likes: video.likes,
      comments: video.comments,
      description: video.description,
      channelId: video.channelId,
      channelTitle: video.channelTitle,
    }));
  }

  // Fallback à l'ancienne méthode si l'API ne retourne pas de données
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(feedUrl, { next: { revalidate: 1800 } }); // cache 30 min
  if (!res.ok) return [];

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml)?.feed ?? {};
  const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : [];

  return entries.slice(0, limit).map((e: any) => ({
    id: e["yt:videoId"],
    title: e.title,
    publishedAt: e.published,
    thumbnail: e["media:group"]["media:thumbnail"]["@_url"],
    views: e["yt:views"],
  }));
}

export default async function YouTubeLatest({ handle = "@SolkarineTwitch" }: { handle?: string }) {
  const channelId = await handleToChannelId(handle);
  const videos = channelId ? await fetchLastVideosByChannelId(channelId, 6) : [];

  if (!videos.length) {
    return <div className="text-sm text-muted-foreground">Aucune vidéo trouvée pour {handle}.</div>;
  }

  // Extraire les deux dernières vidéos pour l'affichage en tête
  const latestTwoVideos = videos.slice(0, 2);
  // Utiliser toutes les vidéos pour le carrousel
  const allVideos = videos;

  return (
    <section className="w-full mx-auto min-h-[50vh] my-15">
      <h2 className="font-dyna-puff flex items-center gap-2 justify-center">
        <FaYoutube className="w-10 h-10 text-[#FF0000]" />
        <span>Découvrez mes dernières vidéos!</span>
      </h2>
      <div className="flex flex-col">
        {/* <div className="flex items-center justify-between">
          <a
            href={`https://www.youtube.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pink-300 hover:text-pink-200 transition-all duration-200 flex items-center gap-1 group"
          >
            <span>Voir toutes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div> */}

        {/* Deux dernières vidéos côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestTwoVideos.map((video) => (
            <div key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {/* Sous-titre pour le carrousel */}
        {/* <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-pink-300/30 to-transparent"></div>
          <h3 className="text-lg font-medium text-pink-200">Toutes les vidéos</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-pink-300/30 to-transparent"></div>
        </div> */}

        {/* Carousel avec toutes les vidéos */}
        <YouTubeCarousel videos={allVideos} />
      </div>
    </section>
  );
}
