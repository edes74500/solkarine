"use client";

import { AddonCard } from "@/components/addons/addoncard";
import { cardVariants, containerVariants } from "@/components/layout/ListFramer";
import { BadgeList } from "@/components/shared/BadgeList";
import { AddonClient } from "@repo/types/dist";
import { AnimatePresence, motion } from "framer-motion";
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

      <motion.div className="flex flex-col gap-4" variants={containerVariants} initial="hidden" animate="visible">
        <AnimatePresence mode="popLayout">
          {filteredAddons.map((addon) => (
            <motion.div
              key={addon.id}
              layout
              variants={cardVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <AddonCard addon={addon} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAddons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            Aucun addon ne correspond à ce tag
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
