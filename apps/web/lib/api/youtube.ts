import { NEXT_API_TAGS } from "@repo/constants/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.fr/api/v1";

export async function getYoutubeLatest(): Promise<{
  success: boolean;
  data: {
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
  }[];
}> {
  try {
    const res = await fetch(`${baseUrl}/youtube/latest`, {
      next: {
        revalidate: 60 * 60 * 4,
        tags: [NEXT_API_TAGS.YOUTUBE.GET.GET_LATEST],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}
