"use client";

import { Button } from "@/components/ui/button";
import { DungeonClient } from "@repo/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DungeonCard from "./DungeonCard";

export default function DungeonList() {
  const [dungeons, setDungeons] = useState<DungeonClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDungeons = async () => {
      setIsLoading(true);
      try {
        // Simulation d'un appel API
        setTimeout(() => {
          const fakeDungeons: DungeonClient[] = [
            {
              id: "1",
              slug: "tazavesh",
              name: "Tazavesh, le marché dissimulé",
              short_name: "Tazavesh",
              keystone_timer_seconds: 1800,
              icon_url: "https://wow.zamimg.com/images/wow/icons/large/achievement_dungeon_tazavesh.jpg",
              background_image_url: "https://wow.zamimg.com/uploads/screenshots/normal/1022903.jpg",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "2",
              slug: "de-other-side",
              name: "L'Autre côté",
              short_name: "DOS",
              keystone_timer_seconds: 1500,
              icon_url: "https://wow.zamimg.com/images/wow/icons/large/achievement_dungeon_deotherside.jpg",
              background_image_url: "https://wow.zamimg.com/uploads/screenshots/normal/978247.jpg",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ];
          setDungeons(fakeDungeons);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError("Erreur lors du chargement des donjons");
        setIsLoading(false);
      }
    };

    fetchDungeons();
  }, []);

  const handleDelete = (id: string) => {
    // Simulation de suppression
    setDungeons((prev) => prev.filter((dungeon) => dungeon.id !== id));
    toast.success("Donjon supprimé");
  };

  const handleEdit = (dungeon: DungeonClient) => {
    // Redirection vers la page d'édition ou ouverture d'un modal
    console.log("Édition du donjon:", dungeon);
    toast.success(`Édition du donjon ${dungeon.name}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/20 p-4 rounded-md text-center">
        <p className="text-destructive font-medium">{error}</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Liste des donjons</h2>

      {dungeons.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">Aucun donjon trouvé</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {dungeons.map((dungeon) => (
            <DungeonCard key={dungeon.id} dungeon={dungeon} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
