"use client";

import { cardVariants, containerVariants } from "@/components/layout/ListFramer";
import { WeakAuraCard } from "@/components/weakAuras/WeakAuraCard";
import { WeakAuraFilter } from "@/components/weakAuras/WeakAuraFilter";
import { WeakAuraClient } from "@repo/types/dist";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
}

export function WeakAuraList({ weakAuras }: WeakAuraListProps) {
  const [filteredWeakAuras, setFilteredWeakAuras] = useState<WeakAuraClient[]>(weakAuras);

  return (
    <div className="flex flex-col gap-6">
      <WeakAuraFilter weakAuras={weakAuras} onFilterChange={setFilteredWeakAuras} />

      <motion.div
        className="flex flex-col gap-4 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredWeakAuras
            .slice()
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((weakAura) => (
              <motion.div
                key={weakAura.id}
                layout
                variants={cardVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <WeakAuraCard weakAura={weakAura} />
              </motion.div>
            ))}
        </AnimatePresence>

        {filteredWeakAuras.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-left py-8 text-muted-foreground"
          >
            Aucun weak aura ne correspond aux critères
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
