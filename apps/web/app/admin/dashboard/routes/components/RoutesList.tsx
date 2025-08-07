"use client";

import EditRouteDialog from "@/app/admin/dashboard/routes/components/EditRouteDialog";
import { RouteCardTwo } from "@/components/routes/RouteCardTwo";
import { useDeleteRouteMutation, useGetRoutesWithPopulatedDungeonQuery } from "@/redux/api/routes.apiSlice";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function RoutesList() {
  const { data: routes } = useGetRoutesWithPopulatedDungeonQuery();
  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteRoute(id).unwrap();
      toast.success("Route supprimée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la route");
      console.error(error);
    }
  };

  return (
    // <div className="flex flex-wrap gap-4 w-full h-full">
    <div className="flex flex-col gap-4 w-full h-full">
      {routes?.data.map((route) => (
        <div key={route.id} className="relative max-w-2xl w-full">
          {/* <div key={route.id} className="relative max-w-xs w-full"> */}
          <RouteCardTwo route={route} />
          <div className="absolute top-2 -right-4 flex flex-col gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="z-10 h-8 w-8 p-0"
              onClick={() => handleDelete(route.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <EditRouteDialog route={route} />
            {/* <AddRouteDialog route={route} onSuccess={() => {}} /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
