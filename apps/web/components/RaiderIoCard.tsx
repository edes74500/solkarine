// components/RaiderIoCard.tsx

"use client";

import Image from "next/image";
import React from "react";

export interface Affix {
  id: number;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  wowhead_url: string;
}

export interface MythicRun {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  completed_at: string;
  clear_time_ms: number;
  keystone_run_id: number;
  par_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  zone_expansion_id: number;
  icon_url: string;
  background_image_url: string;
  score: number;
  affixes: Affix[];
  url: string;
}

export interface Character {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  mythic_plus_best_runs: MythicRun[];
}

interface Props {
  data: Character;
}

const RaiderIoCard: React.FC<Props> = ({ data }) => {
  // Calculer le score total (somme des scores des runs)
  const totalScore = data.mythic_plus_best_runs?.reduce((sum, run) => sum + run.score, 0) || 0;

  // Formater le temps en minutes:secondes
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="border rounded-lg p-6 shadow-md bg-card">
      <div className="flex items-center gap-4 mb-4">
        {data.thumbnail_url && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 aspect-square shrink-0">
            <Image
              src={data.thumbnail_url || ""}
              alt={data.name}
              width={64}
              height={64}
              className="object-cover shrink-0"
            />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold line-clamp-1">{data.name}</h2>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {data.active_spec_name} {data.class} - {data.realm} ({data.region.toUpperCase()})
          </p>
        </div>
      </div>

      <div className="bg-secondary/10 p-3 rounded-md mb-4">
        <p className="text-sm text-muted-foreground">Score Mythic+ total</p>
        <p className="text-xl font-bold">{totalScore.toFixed(1)}</p>
      </div>

      {/* <h3 className="text-lg font-semibold mb-2">Meilleurs runs Mythic+</h3> */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 cursor-pointer">
        {data.mythic_plus_best_runs?.map((run) => (
          <div
            key={run.keystone_run_id}
            className="relative overflow-hidden rounded-md h-12 group"
            onClick={() => {
              window.open(run.url, "_blank");
            }}
          >
            {run.background_image_url && (
              <div className="absolute inset-0">
                <Image src={run.background_image_url} alt={run.dungeon} fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            )}
            <div className="relative z-10 p-3 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white drop-shadow-md line-clamp-1">{run.dungeon}</span>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded ${
                    run.num_keystone_upgrades > 0 ? "bg-green-500/80 text-white" : "bg-orange-500/80 text-white"
                  }`}
                >
                  +{run.mythic_level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <a
          href={data.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Voir le profil complet sur Raider.io
        </a>
      </div>
    </div>
  );
};

export default RaiderIoCard;
