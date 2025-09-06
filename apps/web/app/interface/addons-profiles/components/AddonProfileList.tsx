"use client";

import AddonProfileCard from "@/components/addonProfile/AddonProfileCard";
import ListFilter from "@/components/addonProfile/ListFilter";
import { cardVariants, containerVariants } from "@/components/layout/ListFramer";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AddonProfileListProps {
  addonProfiles: AddonProfileDBWithAddonPopulated[];
}

export default function AddonProfileList({ addonProfiles }: AddonProfileListProps) {
  const [filteredAddonProfiles, setFilteredAddonProfiles] = useState<AddonProfileDBWithAddonPopulated[]>(addonProfiles);

  return (
    <div className="flex flex-col gap-6">
      <ListFilter addonProfiles={addonProfiles} setFilteredAddonProfiles={setFilteredAddonProfiles} />

      <motion.div
        className="flex flex-col gap-4 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredAddonProfiles
            .slice()
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((addonProfile) => (
              <motion.div
                key={addonProfile.id}
                layout
                variants={cardVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <AddonProfileCard addonProfile={addonProfile} />
              </motion.div>
            ))}
        </AnimatePresence>

        {filteredAddonProfiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            Aucun profil d'addon ne correspond aux critères
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
