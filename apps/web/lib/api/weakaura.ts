import { NEXT_API_TAGS } from "@repo/constants/dist";
import { WeakAuraClient } from "@repo/types/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev";

export async function getAllWeakAura(): Promise<{ success: boolean; data: WeakAuraClient[] }> {
  try {
    const res = await fetch(`${baseUrl}/weak-aura`, {
      cache: "force-cache",
      next: { tags: [NEXT_API_TAGS.WEAK_AURA.GET.GET_ALL] },
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
