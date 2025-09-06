"use client";

import { cardVariants, containerVariants } from "@/components/layout/ListFramer";
import { RouteBadge } from "@/components/routes/RouteBadge";
import { RouteCardTwo } from "@/components/routes/RouteCardTwo";
import { RouteDBWithDungeonPopulated } from "@repo/types/dist";
import { Badge } from "@repo/ui/components/badge";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="flex flex-wrap md:flex-col gap-4  md:sticky md:top-4 h-full">
        {uniqueDungeons
          .sort((a, b) => a?.short_name.localeCompare(b?.short_name || "") || 0)
          .map(
            (dungeon) =>
              dungeon && (
                <div key={dungeon._id} className="cursor-pointer md:min-w-[150px]">
                  <RouteBadge
                    // showFullName={true}
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
      <motion.div
        className="flex flex-col gap-4 flex-1 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredRoutes
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((route) => (
              <motion.div
                key={route.id}
                layout
                variants={cardVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <RouteCardTwo route={route} />
              </motion.div>
            ))}
        </AnimatePresence>

        {filteredRoutes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            Aucune route ne correspond aux critères
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
