"use client";

import AddonProfileCard from "@/components/addonProfile/AddonProfileCard";
import ListFilter from "@/components/addonProfile/ListFilter";
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
  const [filteredAddonProfiles, setFilteredAddonProfiles] = useState<AddonProfileDBWithAddonPopulated[]>([]);

  useEffect(() => {
    if (addonProfiles?.data) {
      setFilteredAddonProfiles(addonProfiles.data);
    }
  }, [addonProfiles]);

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
      <h3 className="text-2xl font-semibold">Mes profils d'addons</h3>

      <ListFilter addonProfiles={addonProfiles?.data || []} setFilteredAddonProfiles={setFilteredAddonProfiles} />

      <div className="grid grid-cols-1 gap-4">
        {filteredAddonProfiles.map((addonProfile) => (
          <div key={addonProfile.id} className="relative max-w-2xl w-full min-h-40">
            <AddonProfileCard addonProfile={addonProfile} />
            <div className="absolute top-2 -right-4 flex flex-col gap-2">
              <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
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
