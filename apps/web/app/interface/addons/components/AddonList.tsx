"use client";

import { AddonCard } from "@/components/addons/addoncard";
import { BadgeList } from "@/components/shared/BadgeList";
import { AddonClient } from "@repo/types/dist";
import { useEffect, useState } from "react";

interface AddonListProps {
  addons: AddonClient[];
}

export function AddonList({ addons }: AddonListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredAddons, setFilteredAddons] = useState<AddonClient[]>(addons);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    // Extraire tous les tags uniques des addons
    const allTags = addons.flatMap((addon) => addon.tags);
    const uniqueTags = [...new Set(allTags)];
    setAvailableTags(uniqueTags);
  }, [addons]);

  useEffect(() => {
    if (selectedTag) {
      setFilteredAddons(addons.filter((addon) => addon.tags.includes(selectedTag)));
    } else {
      setFilteredAddons(addons);
    }
  }, [selectedTag, addons]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const tagCount = addons.filter((addon) => addon.tags.includes(tag)).length;
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
          <div key={addon.id}>
            <AddonCard addon={addon} />
          </div>
        ))}
      </div>
    </div>
  );
}
