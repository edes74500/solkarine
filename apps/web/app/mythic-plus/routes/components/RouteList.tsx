"use client";

import { RouteCardTwo } from "@/components/routes/RouteCardTwo";
import { RouteBadge } from "@/components/shared/RouteBadge";
import { RouteDBWithDungeonPopulated } from "@repo/types/dist";
import { Badge } from "@repo/ui/components/badge";
import { useEffect, useState } from "react";

export function RouteDisplay({ routes }: { routes: RouteDBWithDungeonPopulated[] | undefined }) {
  const [selectedDungeon, setSelectedDungeon] = useState<string | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState(routes || []);

  useEffect(() => {
    if (routes) {
      if (selectedDungeon) {
        setFilteredRoutes(routes.filter((route) => route.dungeon_id._id === selectedDungeon));
      } else {
        setFilteredRoutes(routes);
      }
    }
  }, [selectedDungeon, routes]);

  // Extraire les donjons uniques
  const uniqueDungeons = routes
    ? [...new Set(routes.map((route) => route.dungeon_id._id))].map(
        (id) => routes.find((route) => route.dungeon_id._id === id)?.dungeon_id,
      )
    : [];

  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex flex-col gap-4 w-[250px]">
        {uniqueDungeons
          .sort((a, b) => a?.short_name.localeCompare(b?.short_name || "") || 0)
          .map(
            (dungeon) =>
              dungeon && (
                <div key={dungeon._id} className="cursor-pointer">
                  <RouteBadge
                    dungeon={dungeon}
                    selectedDungeon={selectedDungeon}
                    routes={routes || []}
                    setSelectedDungeon={setSelectedDungeon}
                  />
                </div>
              ),
          )}
        {selectedDungeon && (
          <Badge
            variant={selectedDungeon === null ? "default" : "outline"}
            className="cursor-pointer py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all border-2 border-transparent w-full"
            onClick={() => setSelectedDungeon(null)}
          >
            <span className="uppercase">Effacer la sélection</span>
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1 max-w-2xl">
        {filteredRoutes
          // .sort((a, b) => a.dungeon_id.short_name.localeCompare(b.dungeon_id.short_name))
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((route) => (
            <RouteCardTwo key={route.id} route={route} />
          ))}
      </div>
    </div>
  );
}
