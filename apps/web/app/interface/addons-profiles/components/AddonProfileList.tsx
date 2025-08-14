"use client";

import AddonProfileCard from "@/components/addonProfile/AddonProfileCard";
import ListFilter from "@/components/addonProfile/ListFilter";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";
import { useState } from "react";

interface AddonProfileListProps {
  addonProfiles: AddonProfileDBWithAddonPopulated[];
}

export default function AddonProfileList({ addonProfiles }: AddonProfileListProps) {
  const [filteredAddonProfiles, setFilteredAddonProfiles] = useState<AddonProfileDBWithAddonPopulated[]>(addonProfiles);

  return (
    <div className="flex flex-col gap-6">
      <ListFilter addonProfiles={addonProfiles} setFilteredAddonProfiles={setFilteredAddonProfiles} />
      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        {filteredAddonProfiles
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((addonProfile) => (
            <AddonProfileCard key={addonProfile.id} addonProfile={addonProfile} />
          ))}
      </div>
    </div>
  );
}
