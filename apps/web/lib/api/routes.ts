import { NEXT_API_TAGS } from "@repo/constants/dist";
import { RouteDBWithDungeonPopulated } from "@repo/types/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev";

export async function getRoutesWithPopulatedDungeon(): Promise<{
  success: boolean;
  data: RouteDBWithDungeonPopulated[];
}> {
  try {
    const res = await fetch(`${baseUrl}/routes/routes-with-populated-dungeon`, {
      cache: "force-cache",
      next: {
        tags: [NEXT_API_TAGS.ROUTE.GET.GET_ALL_WITH_POPULATED_DUNGEON],
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
