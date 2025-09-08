import { NEXT_API_TAGS } from "@repo/constants";
import { TalentClientWithDungeonPopulated } from "@repo/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev";

export async function getAllTalentsWithPopulatedDungeon(): Promise<{
  success: boolean;
  data: TalentClientWithDungeonPopulated[];
}> {
  try {
    const res = await fetch(`${baseUrl}/talents/get-all-with-populated-dungeon`, {
      cache: "force-cache",
      next: { tags: [NEXT_API_TAGS.TALENTS.GET.GET_ALL] },
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

// export async function getAllAddonsTags(): Promise<{ success: boolean; data: string[] }> {
//   try {
//     const res = await fetch(`${baseUrl}/addon/tags`, {
//       cache: "no-store",
//       next: { tags: [`addon-getAllAddonsTags`] },
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return { success: false, data: [] };
//   }
// }
