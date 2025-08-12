import { NEXT_API_TAGS } from "@repo/constants/dist";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev/api/v1";

export async function getAllAddonProfilesWithPopulatedAddon(): Promise<{
  success: boolean;
  data: AddonProfileDBWithAddonPopulated[];
}> {
  try {
    const res = await fetch(`${baseUrl}/addon-profile`, {
      cache: "force-cache",
      next: { tags: [NEXT_API_TAGS.ADDON_PROFILE.GET.GET_ALL_WITH_POPULATED_ADDON] },
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
