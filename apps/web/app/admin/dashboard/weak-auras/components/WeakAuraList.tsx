"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WeakAuraClient } from "@repo/types";
import { WeakAuraCard } from "./WeakAuraCard";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
  onDelete?: (id: string) => void;
}

export function WeakAuraList({ weakAuras, onDelete }: WeakAuraListProps) {
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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">WeakAuras</h2>
      <div className="grid grid-cols-1 gap-4">
        {weakAuras.map((weakAura) => (
          <WeakAuraCard key={weakAura.id} weakAura={weakAura} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
