export const getTwitchSchedule = async () => {
  try {
    const response = await fetch("https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=223842601", {
      next: {
        revalidate: 60 * 60 * 24, // 24 heures
        tags: [`twitch-getTwitchSchedule`],
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch API erreur ${response.status} – ${await response.text()}`);
    }

    return response.text();
  } catch (error) {
    console.error("Erreur lors de la récupération du planning Twitch:", error);
    return null;
  }
};
