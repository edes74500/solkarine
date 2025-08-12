"use client";

import AddRouteDialog from "@/app/admin/dashboard/routes/components/AddRouteDialog";
import { RouteCardTwo } from "@/components/routes/RouteCardTwo";
import { RouteBadge } from "@/components/shared/RouteBadge";
import { DashboardEmptyListCard } from "@/components/statusCard/DashboardEmptyListCard";
import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useDeleteRouteMutation, useGetRoutesWithPopulatedDungeonQuery } from "@/redux/api/routes.apiSlice";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RoutesList() {
  const { data: routes, isLoading, isError } = useGetRoutesWithPopulatedDungeonQuery();
  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();
  const [selectedDungeon, setSelectedDungeon] = useState<string | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState(routes?.data || []);

  useEffect(() => {
    if (routes?.data) {
      if (selectedDungeon) {
        setFilteredRoutes(routes.data.filter((route) => route.dungeon_id._id === selectedDungeon));
      } else {
        setFilteredRoutes(routes.data);
      }
    }
  }, [selectedDungeon, routes]);

  const handleDelete = async (id: string) => {
    try {
      await deleteRoute(id).unwrap();
      toast.success("Route supprimée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la route");
      console.error(error);
    }
  };

  const handleDungeonClick = (dungeonId: string) => {
    setSelectedDungeon(selectedDungeon === dungeonId ? null : dungeonId);
  };

  // Extraire les donjons uniques
  const uniqueDungeons = routes?.data
    ? [...new Set(routes.data.map((route) => route.dungeon_id._id))].map(
        (id) => routes.data.find((route) => route.dungeon_id._id === id)?.dungeon_id,
      )
    : [];

  if (isLoading) {
    return <LoadingCard />;
  }

  if (routes?.data.length === 0) {
    return <DashboardEmptyListCard />;
  }

  if (isError) {
    return <ErrorCard />;
  }

  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex flex-col gap-2 min-w-[200px]">
        {uniqueDungeons.length > 0 &&
          uniqueDungeons.map(
            (dungeon) =>
              dungeon && (
                <div key={dungeon._id} onClick={() => handleDungeonClick(dungeon._id)} className="cursor-pointer">
                  <RouteBadge
                    dungeon={dungeon}
                    selectedDungeon={selectedDungeon}
                    routes={routes?.data || []}
                    setSelectedDungeon={setSelectedDungeon}
                  />
                </div>
              ),
          )}
        {selectedDungeon && (
          <Badge
            variant={selectedDungeon === null ? "default" : "outline"}
            className="cursor-pointer py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all  border-2 border-transparent w-full"
            onClick={() => setSelectedDungeon(null)}
          >
            <span className="uppercase">Effacer la sélection</span>
            {/* <span className="text-xs ml-2">{routes?.data?.length || 0}</span> */}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {filteredRoutes
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((route) => (
            <div key={route.id} className="relative max-w-2xl w-full">
              <RouteCardTwo route={route} />
              <div className="absolute top-2 -right-4 flex flex-col gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleDelete(route.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <AddRouteDialog mode="edit" route={route} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
