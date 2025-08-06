"use client";

import { WeakAuraCard } from "@/components/weakAuras/WeakAuraCard";
import { WeakAuraFilter } from "@/components/weakAuras/WeakAuraFilter";
import { WeakAuraClient } from "@repo/types/dist";
import { useState } from "react";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
}

export function WeakAuraList({ weakAuras }: WeakAuraListProps) {
  const [filteredWeakAuras, setFilteredWeakAuras] = useState<WeakAuraClient[]>(weakAuras);

  return (
    <div className="flex flex-col gap-4 space-y-10">
      <WeakAuraFilter weakAuras={weakAuras} onFilterChange={setFilteredWeakAuras} />
      <div className="flex flex-col gap-4 max-w-2xl">
        {filteredWeakAuras
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((weakAura) => (
            <WeakAuraCard key={weakAura.id} weakAura={weakAura} />
          ))}
      </div>
    </div>
  );
}
