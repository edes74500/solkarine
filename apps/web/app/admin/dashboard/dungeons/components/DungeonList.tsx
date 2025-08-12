"use client";

import { DashboardEmptyListCard } from "@/components/statusCard/DashboardEmptyListCard";
import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { DungeonClient } from "@repo/types";
import { toast } from "sonner";
import DungeonCard from "./DungeonCard";

export default function DungeonList() {
  // const [dungeons, setDungeons] = u/seState<DungeonClient[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { data: dungeons, isLoading, isError, isFetching } = useGetDungeonsQuery();

  const handleEdit = (dungeon: DungeonClient) => {
    // Simulation d'édition - ici vous pourrez connecter Redux plus tard
    console.log("Édition du donjon:", dungeon);
    toast.success(`Donjon ${dungeon.name} modifié avec succès`);
  };

  if (isLoading || isFetching) {
    return <LoadingCard />;
  }

  if (isError) {
    return <ErrorCard />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Liste des donjons</h2>

      {dungeons?.data?.length === 0 ? (
        <DashboardEmptyListCard />
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
