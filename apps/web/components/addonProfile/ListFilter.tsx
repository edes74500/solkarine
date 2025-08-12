"use client";

import { BadgeList } from "@/components/shared/BadgeList";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";
import { useEffect, useState } from "react";

interface ListFilterProps {
  addonProfiles: AddonProfileDBWithAddonPopulated[];
  setFilteredAddonProfiles: (filteredAddonProfiles: AddonProfileDBWithAddonPopulated[]) => void;
}

export default function ListFilter({ addonProfiles, setFilteredAddonProfiles }: ListFilterProps) {
  const [selectedAddon, setSelectedAddon] = useState<string | null>(null);
  const [availableAddons, setAvailableAddons] = useState<string[]>([]);

  useEffect(() => {
    if (addonProfiles) {
      // Extraire tous les noms d'addons uniques
      const allAddons = addonProfiles.map((addonProfile) => addonProfile.addon_id.name);
      const uniqueAddons = [...new Set(allAddons)];
      setAvailableAddons(uniqueAddons);
      setFilteredAddonProfiles(addonProfiles);
    }
  }, [addonProfiles, setFilteredAddonProfiles]);

  useEffect(() => {
    if (!addonProfiles) return;

    if (selectedAddon) {
      setFilteredAddonProfiles(
        addonProfiles.filter((addonProfile) => addonProfile.addon_id.name.includes(selectedAddon)),
      );
    } else {
      setFilteredAddonProfiles(addonProfiles);
    }
  }, [selectedAddon, addonProfiles, setFilteredAddonProfiles]);

  const handleTagClick = (tag: string) => {
    setSelectedAddon(selectedAddon === tag ? null : tag);
  };

  return (
    <div className="flex flex-wrap gap-2 max-w-4xl">
      {availableAddons.map((addon) => {
        const addonCount =
          addonProfiles?.filter((addonProfile) => addonProfile.addon_id.name.includes(addon)).length || 0;
        return (
          <BadgeList
            key={addon}
            tag={addon}
            imageUrl={addonProfiles.find((addonProfile) => addonProfile.addon_id.name === addon)?.addon_id.imageUrl}
            selectedTag={selectedAddon}
            handleTagClick={handleTagClick}
            tagCount={addonCount}
          />
        );
      })}
    </div>
  );
}
