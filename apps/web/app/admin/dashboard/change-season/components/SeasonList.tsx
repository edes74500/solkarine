"use client";

import { Season } from "@repo/types";
import { SeasonCard } from "./SeasonCard";

interface SeasonListProps {
  seasons: Season[];
  onSelectSeason: (season: Season) => void;
}

export function SeasonList({ seasons, onSelectSeason }: SeasonListProps) {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Saisons disponibles</h2>
      <div className="flex flex-wrap gap-4">
        {seasons.map((season: Season) => (
          <SeasonCard key={season.slug} season={season} onSelect={onSelectSeason} />
        ))}
      </div>
    </section>
  );
} 