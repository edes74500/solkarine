import { CharacterClient } from "@repo/types/dist";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "https://api.solkarine.jdapp.dev";

export async function getAllCharacters(): Promise<{ success: boolean; data: CharacterClient[] }> {
  try {
    const res = await fetch(`${baseUrl}/character`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: [`character-getAllCharacters`],
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
