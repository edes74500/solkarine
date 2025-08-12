"use client";

import { EditAddonDialog } from "@/app/admin/dashboard/addons/components/EditAddonDialog";
import { AddonCard } from "@/components/addons/addoncard";
import { BadgeList } from "@/components/shared/BadgeList";
import { DashboardEmptyListCard } from "@/components/statusCard/DashboardEmptyListCard";
import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useDeleteAddonMutation, useGetAddonsQuery } from "@/redux/api/addon.apiSlice";
import { AddonClient } from "@repo/types/dist";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AddonList() {
  const { data: addons, isLoading, isError, isFetching } = useGetAddonsQuery();
  const [deleteAddon, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteAddonMutation();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredAddons, setFilteredAddons] = useState<AddonClient[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [addonToDelete, setAddonToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (addons?.data) {
      // Extraire tous les tags uniques des addons
      const allTags = addons.data.flatMap((addon) => addon.tags);
      const uniqueTags = [...new Set(allTags)];
      setAvailableTags(uniqueTags);
      setFilteredAddons(addons.data);
    }
  }, [addons]);

  useEffect(() => {
    if (!addons?.data) return;

    if (selectedTag) {
      setFilteredAddons(addons.data.filter((addon) => addon.tags.includes(selectedTag)));
    } else {
      setFilteredAddons(addons.data);
    }
  }, [selectedTag, addons]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleEditSuccess = (data: any) => {
    console.log("Addon modifié avec succès:", data);
  };

  const handleDelete = async (id: string, confirm = false) => {
    try {
      const response = await deleteAddon({ id, confirm }).unwrap();

      if (response.success) {
        toast.success("Addon supprimé avec succès");
      } else {
        setAddonToDelete(id);
        setDeleteMessage(response.message);
        setConfirmDialogOpen(true);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'addon:", error);
      toast.error("Erreur lors de la suppression de l'addon");
    }
  };

  const handleConfirmDelete = () => {
    if (addonToDelete) {
      handleDelete(addonToDelete, true);
    }
    setConfirmDialogOpen(false);
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorCard message="Erreur lors du chargement des addons" />;
  if (addons?.data.length === 0) return <DashboardEmptyListCard />;

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Mes addons</h2>

      <div className="flex flex-wrap gap-2 max-w-4xl">
        {availableTags.map((tag) => {
          const tagCount = addons?.data.filter((addon) => addon.tags.includes(tag)).length || 0;
          return (
            <BadgeList
              key={tag}
              tag={tag}
              selectedTag={selectedTag}
              handleTagClick={handleTagClick}
              tagCount={tagCount}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {filteredAddons.map((addon) => (
          <div key={addon.id} className="flex flex-col gap-4 relative w-fit">
            <AddonCard key={addon.id} addon={addon} />
            <div className="absolute top-2 -right-4 flex flex-col gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="z-10 h-8 w-8 p-0"
                onClick={() => handleDelete(addon.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <EditAddonDialog addon={addon} onSuccess={handleEditSuccess} />
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation de suppression</AlertDialogTitle>
            <AlertDialogDescription>{deleteMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
