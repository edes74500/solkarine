"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WeakAuraClient } from "@repo/types";
import { useState } from "react";
import { WeakAuraCard } from "./WeakAuraCard";
import { WeakAuraFilter } from "./WeakAuraFilter";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
  onDelete?: (id: string) => void;
}

export function WeakAuraList({ weakAuras, onDelete }: WeakAuraListProps) {
  const [filteredWeakAuras, setFilteredWeakAuras] = useState<WeakAuraClient[]>(weakAuras);

  if (!weakAuras || weakAuras.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Aucune WeakAura trouvée. Ajoutez-en une en utilisant le formulaire ci-dessus.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold">Mes Weak-Auras</h2>
      <WeakAuraFilter weakAuras={weakAuras} onFilterChange={setFilteredWeakAuras} />
      <div className="grid grid-cols-1 gap-4">
        {filteredWeakAuras
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((weakAura) => (
            <WeakAuraCard key={weakAura.id} weakAura={weakAura} onDelete={onDelete} />
          ))}
      </div>
    </div>
  );
}
