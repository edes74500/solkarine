"use client";

import { BadgeList } from "@/components/shared/BadgeList";
import { DashboardEmptyListCard } from "@/components/statusCard/DashboardEmptyListCard";
import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetAddonProfilesQuery } from "@/redux/api/addonProfile.apiSlice";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddonProfileList() {
  const { data: addonProfiles, isLoading, isError } = useGetAddonProfilesQuery();
  const [selectedAddon, setSelectedAddon] = useState<string | null>(null);
  const [filteredAddonProfiles, setFilteredAddonProfiles] = useState<AddonProfileDBWithAddonPopulated[]>([]);
  const [availableAddons, setAvailableAddons] = useState<string[]>([]);

  useEffect(() => {
    if (addonProfiles?.data) {
      // Extraire tous les noms d'addons uniques
      const allAddons = addonProfiles.data.map((addonProfile) => addonProfile.addon_id.name);
      const uniqueAddons = [...new Set(allAddons)];
      setAvailableAddons(uniqueAddons);
      setFilteredAddonProfiles(addonProfiles.data);
    }
  }, [addonProfiles]);

  useEffect(() => {
    if (!addonProfiles?.data) return;

    if (selectedAddon) {
      setFilteredAddonProfiles(
        addonProfiles.data.filter((addonProfile) => addonProfile.addon_id.name.includes(selectedAddon)),
      );
    } else {
      setFilteredAddonProfiles(addonProfiles.data);
    }
  }, [selectedAddon, addonProfiles]);

  const handleTagClick = (tag: string) => {
    setSelectedAddon(selectedAddon === tag ? null : tag);
  };

  const handleDelete = async (id: string) => {
    try {
      // Implémentation à venir
      toast.success("Profil d'addon supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du profil d'addon:", error);
      toast.error("Erreur lors de la suppression du profil d'addon");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorCard message="Erreur lors du chargement des profils d'addons" />;
  if (addonProfiles?.data.length === 0) return <DashboardEmptyListCard />;

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Mes profils d'addons</h2>

      <div className="flex flex-wrap gap-2 max-w-4xl">
        {availableAddons.map((addon) => {
          const addonCount =
            addonProfiles?.data.filter((addonProfile) => addonProfile.addon_id.name.includes(addon)).length || 0;
          return (
            <BadgeList
              key={addon}
              tag={addon}
              selectedTag={selectedAddon}
              handleTagClick={handleTagClick}
              tagCount={addonCount}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {filteredAddonProfiles.map((addonProfile) => (
          <div key={addonProfile.id} className="flex flex-col gap-4 relative w-fit">
            <div className="flex flex-col gap-2 border rounded-md p-4 bg-card">
              <div className="flex items-center gap-2">
                <img
                  src={addonProfile.addon_id.imageUrl}
                  alt={addonProfile.addon_id.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-bold">{addonProfile.addon_id.name}</span> - {addonProfile.name}
              </div>
              <img
                src={addonProfile.screenshots[0]}
                alt={addonProfile.name}
                className="w-[200px] aspect-video object-cover"
              />
              <p className="text-sm text-muted-foreground">{addonProfile.description}</p>
            </div>
            <div className="absolute top-2 -right-4 flex flex-col gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="z-10 h-8 w-8 p-0"
                onClick={() => handleDelete(addonProfile.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="z-10 h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
