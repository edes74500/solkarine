"use client";

import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { DungeonClient } from "@repo/types";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import DungeonCard from "./DungeonCard";

export default function DungeonList() {
  // const [dungeons, setDungeons] = u/seState<DungeonClient[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { data: dungeons, isLoading, error } = useGetDungeonsQuery();

  const handleEdit = (dungeon: DungeonClient) => {
    // Simulation d'édition - ici vous pourrez connecter Redux plus tard
    console.log("Édition du donjon:", dungeon);
    toast.success(`Donjon ${dungeon.name} modifié avec succès`);
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
        {/* <p className="text-destructive font-medium">{error.data?.message || "Une erreur est survenue"}</p> */}
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Liste des donjons</h2>

      {dungeons?.data?.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">Aucun donjon trouvé</p>
        </div>
      ) : (
        <div
          className="grid gap-4 w-full justify-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, max-content))" }}
        >
          {dungeons?.data?.map((dungeon) => (
            <DungeonCard key={dungeon.id} dungeon={dungeon} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
