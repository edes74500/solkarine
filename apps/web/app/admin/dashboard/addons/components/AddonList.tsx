"use client";

import { EditAddonDialog } from "@/app/admin/dashboard/addons/components/EditAddonDialog";
import { AddonCard } from "@/components/addons/addoncard";
import { ErrorCard } from "@/components/errorCards/ErrorCard";
import { BadgeList } from "@/components/shared/BadgeList";
import { LoadingSpinner } from "@/components/spinners/LoadingSpinner";
import { useDeleteAddonMutation, useGetAddonsQuery, useUpdateAddonMutation } from "@/redux/api/addon.apiSlice";
import { AddonClient } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AddonList() {
  const { data: addons, isLoading, isError } = useGetAddonsQuery();
  const [deleteAddon, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteAddonMutation();
  const [updateAddon, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] =
    useUpdateAddonMutation();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredAddons, setFilteredAddons] = useState<AddonClient[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

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
    </div>
  );
}
