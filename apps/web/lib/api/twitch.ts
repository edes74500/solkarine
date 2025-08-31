import { NEXT_API_TAGS } from "@repo/constants";

export const getTwitchSchedule = async () => {
  try {
    const response = await fetch("https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=223842601", {
      next: {
        revalidate: 60 * 60 * 24, // 24 heures
        tags: [NEXT_API_TAGS.TWITCH.GET.GET_SCHEDULE],
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch API erreur ${response.status} – ${await response.text()}`);
    }
    const data = await response.text();
    // console.log("response", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du planning Twitch:", error);
    return null;
  }
};
