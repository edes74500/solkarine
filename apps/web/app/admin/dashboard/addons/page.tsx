"use client";

export default function AddonPage() {
  const fetchCurseForgeAddons = async () => {
    try {
      const response = await fetch("https://api.curseforge.com/v1/mods/search?gameId=1&searchFilter=Baganator", {
        method: "GET",
        headers: {
          "x-api-key":
            process.env.NEXT_PUBLIC_CURSEFORGE_API_KEY ||
            "$2a$10$OZI5uE8e6Tw1ISfxfGPD6u9imGlJfmyIvhFwggz9M2D8Bqyyp9c6.",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des addons:", error);
      return null;
    }
  };

  return (
    <div>
      <button onClick={fetchCurseForgeAddons}>Fetch Addons</button>
    </div>
  );
}
