// lib/raider.ts
import { Character } from "@/components/RaiderIoCard";

const BASE = process.env.RAIDER_IO_BASE_URL || "https://raider.io/api/v1";
const FIELDS = ["mythic_plus_best_runs"].join(",");

/** Retire les accents, ligatures, etc. */
function normalizeName(str: string): string {
  return str
    .normalize("NFD") // décompose les caractères accentués
    .replace(/\p{Diacritic}/gu, ""); // supprime les diacritiques
}

export async function fetchRaiderCharacter(region: string, realm: string, name: string): Promise<Character> {
  // 1) normalise et 2) encode chaque segment
  //   const rgn = encodeURIComponent(region.toLowerCase());
  //   const rl = encodeURIComponent(realm.toLowerCase());
  //   const nm = encodeURIComponent(normalizeName(name));

  const url = `${BASE}/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=${FIELDS}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Raider.IO API erreur ${res.status} – ${await res.text()}`);
  }
  //   console.log(res.json());

  return res.json(); // ici on est sûr que c'est du JSON
}
