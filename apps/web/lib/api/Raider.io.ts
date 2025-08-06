// lib/raider.ts

import { RaiderioCharacter } from "@repo/types/dist";

const BASE = process.env.NEXT_PUBLIC_RAIDER_IO_BASE_URL || "https://raider.io/api/v1";
const FIELDS = ["fields", "mythic_plus_best_runs,mythic_plus_scores_by_season:current", "gear"].join(",");

/** Retire les accents, ligatures, etc. */
// function normalizeName(str: string): string {
//   return str
//     .normalize("NFD") // décompose les caractères accentués
//     .replace(/\p{Diacritic}/gu, ""); // supprime les diacritiques
// }

export async function fetchRaiderCharacter(
  region: string,
  realm: string,
  name: string,
  fields: string = FIELDS,
): Promise<RaiderioCharacter> {
  // 1) normalise et 2) encode chaque segment
  //   const rgn = encodeURIComponent(region.toLowerCase());
  //   const rl = encodeURIComponent(realm.toLowerCase());
  //   const nm = encodeURIComponent(normalizeName(name));

  const url = `${BASE}/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=${fields}`;
  const res = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 24, // 24 heures
      tags: [`character-getRaiderIoCharacter`],
    },
  });

  if (!res.ok) {
    throw new Error(`Raider.IO API erreur ${res.status} – ${await res.text()}`);
  }
  //   console.log(res.json());

  return res.json(); // ici on est sûr que c'est du JSON
}
