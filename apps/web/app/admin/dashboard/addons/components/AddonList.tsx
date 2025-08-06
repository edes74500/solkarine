import { EditAddonDialog } from "@/app/admin/dashboard/addons/components/EditAddonDialog";
import { AddonCard } from "@/components/addons/addoncard";
import { ErrorCard } from "@/components/errorCards/ErrorCard";
import { LoadingSpinner } from "@/components/spinners/LoadingSpinner";
import { useDeleteAddonMutation, useGetAddonsQuery, useUpdateAddonMutation } from "@/redux/api/addon.apiSlice";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AddonList() {
  const { data: addons, isLoading, isError } = useGetAddonsQuery();
  const [deleteAddon, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteAddonMutation();
  const [updateAddon, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] =
    useUpdateAddonMutation();

  const handleEditSuccess = (data: any) => {
    console.log("Addon modifié avec succès:", data);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddon(id);
      toast.success("Addon supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'addon:", error);
      toast.error("Erreur lors de la suppression de l'addon");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorCard message="Erreur lors du chargement des addons" />;

  return (
    <div className=" space-y-4">
      <h2 className="text-2xl font-bold">Mes addons</h2>
      {addons?.data.map((addon) => (
        <div key={addon.id} className="flex flex-col gap-4 relative w-fit">
          <AddonCard key={addon.id} addon={addon} />
          <div className="absolute top-2 -right-4 flex flex-col gap-2">
            <Button variant="destructive" size="sm" className="z-10 h-8 w-8 p-0" onClick={() => handleDelete(addon.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <EditAddonDialog addon={addon} onSuccess={handleEditSuccess} />
          </div>
        </div>
      ))}
    </div>
  );
}
