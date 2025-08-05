"use client";

import { Season } from "@repo/types";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Image from "next/image";

interface SeasonCardProps {
  season: Season;
  onSelect: (season: Season) => void;
}

export function SeasonCard({ season, onSelect }: SeasonCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden max-w-xs">
      <CardHeader className="bg-card border-b">
        <CardTitle>{season.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <p>ID Blizzard: {season.blizzard_season_id}</p>
          <p>Nom court: {season.short_name}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-4 grow">
        <div className="mb-4">
          <p className="text-sm font-medium">Période:</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(season.starts.eu)} - {formatDate(season.ends.eu)}
          </p>
        </div>
        <p className="font-medium mb-2">Donjons ({season.dungeons.length}):</p>
        <div className="grid grid-cols-2 gap-2">
          {season.dungeons.slice(0, 8).map((dungeon) => (
            <div key={dungeon.id} className="flex items-center gap-2">
              <div className="relative w-6 h-6 overflow-hidden rounded-sm">
                <Image src={dungeon.icon_url} alt={dungeon.name} width={24} height={24} className="object-cover" />
              </div>
              <span className="text-xs truncate">{dungeon.short_name}</span>
            </div>
          ))}
          {season.dungeons.length > 8 && (
            <div className="text-xs text-muted-foreground">+{season.dungeons.length - 8} autres</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50 flex">
        <Button variant="default" size="sm" onClick={() => onSelect(season)}>
          Sélectionner cette saison
        </Button>
      </CardFooter>
    </Card>
  );
}
