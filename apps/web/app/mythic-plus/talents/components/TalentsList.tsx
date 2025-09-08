"use client";

import TalentsCard from "@/components/cards/TalentsCard";
import { TalentsFilter } from "@/components/filters/TalentsFilter";
import { cardVariants, containerVariants } from "@/components/layout/ListFramer";
import { TalentClientWithDungeonPopulated } from "@repo/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function TalentsList({ talents }: { talents: TalentClientWithDungeonPopulated[] }) {
  const [filteredTalents, setFilteredTalents] = useState<TalentClientWithDungeonPopulated[]>(talents);

  return (
    <div className="flex flex-col gap-6">
      <TalentsFilter talents={talents} onFilterChange={setFilteredTalents} />

      <motion.div className="flex flex-wrap gap-4" variants={containerVariants} initial="hidden" animate="visible">
        <AnimatePresence mode="popLayout">
          {filteredTalents.map((talent) => (
            <motion.div
              key={talent._id}
              layout
              variants={cardVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="!w-2xs min-h-40 !min-w-2xs !max-w-2xs"
            >
              <TalentsCard talent={talent} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTalents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground w-full"
          >
            Aucun talent ne correspond aux critères
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
