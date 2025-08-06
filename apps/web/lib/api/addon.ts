import { AddonClient } from "@repo/types/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev";

export async function getAllAddons(): Promise<{ success: boolean; data: AddonClient[] }> {
  try {
    const res = await fetch(`${baseUrl}/addon`, {
      cache: "force-cache",
      next: { tags: [`addon-getAllAddons`] },
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
