// controllers/youtube.controller.ts
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import { XMLParser } from "fast-xml-parser";

dotenv.config();

const YT_API_KEY = process.env.YT_API_KEY;
const DEFAULT_CHANNEL_ID = process.env.YT_CHANNEL_ID;

type VideoItem = {
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

async function handleToChannelId(handle: string): Promise<string | null> {
  const h = handle.startsWith("@") ? handle : `@${handle}`;
  try {
    const res = await axios.get(`https://www.youtube.com/${encodeURIComponent(h)}`, { timeout: 10_000 });
    const html: string = res.data;
    const m1 = html.match(/"channelId":"(UC[0-9A-Za-z_-]{22})"/);
    if (m1) return m1[1];
    const m2 = html.match(/youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})/);
    if (m2) return m2[1];
    return null;
  } catch {
    return null;
  }
}

async function fetchRssVideos(channelId: string, limit = 6): Promise<VideoItem[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  try {
    const res = await axios.get(feedUrl, { timeout: 10_000 });
    const xml = res.data as string;

    const parser = new XMLParser({ ignoreAttributes: false });
    const feed = parser.parse(xml)?.feed ?? {};
    const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : [];

    return entries
      .slice(0, limit)
      .map((e: any) => ({
        id: e?.["yt:videoId"] ?? "",
        title: e?.title ?? "",
        // RSS ne contient pas la description de la vidéo → on la prendra via snippet
        description: undefined,
        publishedAt: e?.published ?? "",
        thumbnail: e?.["media:group"]?.["media:thumbnail"]?.["@_url"] ?? "",
      }))
      .filter((v: VideoItem) => v.id);
  } catch (err: any) {
    const code = err?.response?.status;
    const text = err?.response?.statusText;
    throw new Error(`RSS fetch failed: ${code ?? "?"} ${text ?? ""}`.trim());
  }
}

/** Récupère snippet + statistics (2 units par appel) pour jusqu'à 50 IDs */
async function fetchVideoMeta(ids: string[]): Promise<
  Record<
    string,
    {
      title: string;
      description: string;
      publishedAt: string;
      channelId: string;
      channelTitle: string;
      thumbnails: any;
      views: number;
      likes: number;
      comments: number;
    }
  >
> {
  if (!ids.length) return {};
  if (!YT_API_KEY) throw new Error("Missing YT_API_KEY");

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids.join(",")}&key=${YT_API_KEY}`;
  try {
    const res = await axios.get(url, { timeout: 10_000 });
    const json = res.data as any;

    const out: Record<string, any> = {};
    for (const it of json.items ?? []) {
      const sn = it.snippet || {};
      const st = it.statistics || {};
      out[it.id] = {
        title: sn.title ?? "",
        description: sn.description ?? "",
        publishedAt: sn.publishedAt ?? "",
        channelId: sn.channelId ?? "",
        channelTitle: sn.channelTitle ?? "",
        thumbnails: sn.thumbnails ?? {},
        views: Number(st.viewCount ?? 0),
        likes: Number(st.likeCount ?? 0),
        comments: Number(st.commentCount ?? 0),
      };
    }
    return out;
  } catch (err: any) {
    const code = err?.response?.status;
    const text = err?.response?.statusText;
    throw new Error(`YouTube API failed: ${code ?? "?"} ${text ?? ""}`.trim());
  }
}

/**
 * GET /youtube/latest
 * Query:
 *   - channelId?: string  (prioritaire si fourni)
 *   - handle?: string     (ex: "@SolkarineTwitch" — utilisé si pas de channelId)
 *   - limit?: number      (1..50, défaut 20)
 *
 * Réponse:
 * {
 *   success: true,
 *   cache: false,
 *   key: "sha1 des IDs",
 *   data: [{
 *     id, title, description, publishedAt, thumbnail,
 *     channelId, channelTitle, views, likes, comments
 *   }]
 * }
 */
export async function getYouTubeLatestController(req: Request, res: Response) {
  try {
    if (!YT_API_KEY) {
      return res.status(500).json({ success: false, error: "YT_API_KEY is not set" });
    }

    const limit = Math.min(Math.max(Number(req.query.limit ?? 20), 1), 50);

    // 1) Déterminer le channelId (priorité: query.channelId > query.handle > env)
    let channelId = String(req.query.channelId || "");
    if (!channelId) {
      const handle = String(req.query.handle || DEFAULT_CHANNEL_ID);
      if (handle) {
        const resolved = await handleToChannelId(handle);
        if (!resolved) {
          return res.status(400).json({ success: false, error: `Unable to resolve handle '${handle}' to channelId` });
        }
        channelId = resolved;
      } else {
        channelId = String(DEFAULT_CHANNEL_ID || "");
      }
    }
    if (!channelId) {
      return res.status(400).json({ success: false, error: "channelId is required (query, handle, or YT_CHANNEL_ID)" });
    }

    // 2) RSS → liste des vidéos (IDs + titre/date/thumbnail de base)
    const videos = await fetchRssVideos(channelId, limit);
    if (!videos.length) {
      return res.status(200).json({ success: true, cache: false, key: "", data: [] });
    }

    // 3) Enrichissement via YouTube Data API (snippet + statistics)
    const ids = videos.map((v) => v.id);
    const meta = await fetchVideoMeta(ids);

    // 4) Fusionner RSS (thumbnail/date fallback) + meta (snippet/stats)
    const data: VideoItem[] = videos.map((v) => {
      const m = meta[v.id] || {};
      // Choix : titre/description/date pris de snippet (source “officielle”)
      // thumbnail : préfère snippet.high si dispo, sinon RSS
      const thumb =
        m.thumbnails?.maxres?.url ||
        m.thumbnails?.standard?.url ||
        m.thumbnails?.high?.url ||
        m.thumbnails?.medium?.url ||
        m.thumbnails?.default?.url ||
        v.thumbnail;

      return {
        id: v.id,
        title: m.title ?? v.title,
        description: m.description ?? v.description ?? "",
        publishedAt: m.publishedAt ?? v.publishedAt,
        thumbnail: thumb,
        channelId: m.channelId ?? "",
        channelTitle: m.channelTitle ?? "",
        views: m.views ?? 0,
        likes: m.likes ?? 0,
        comments: m.comments ?? 0,
      };
    });

    // Clé pour monitorer l’alignement flux/stats
    const key = crypto.createHash("sha1").update(ids.join(",")).digest("hex");

    // Anti-cache (tu gères le cache côté Next avec revalidate)
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({ success: true, cache: false, key, data });
  } catch (err: any) {
    console.error("YouTube latest error:", err?.message || err);
    const msg = err?.message || "Failed to fetch YouTube latest videos";
    return res.status(502).json({ success: false, error: msg });
  }
}
