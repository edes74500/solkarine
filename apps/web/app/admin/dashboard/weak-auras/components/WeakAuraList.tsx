"use client";

import { WeakAuraCard } from "@/components/weakAuras/WeakAuraCard";
import { useDeleteWeakAuraMutation } from "@/redux/api/weakAuras.apiSlice";
import { WeakAuraClient } from "@repo/types";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WeakAuraFilter } from "../../../../../components/weakAuras/WeakAuraFilter";
import { EditWeakAuraDialog } from "./EditWeakAuraDialog";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
  onDelete?: (id: string) => void;
}

export function WeakAuraList({ weakAuras, onDelete }: WeakAuraListProps) {
  const [filteredWeakAuras, setFilteredWeakAuras] = useState<WeakAuraClient[]>(weakAuras);
  const [deleteWeakAura, { isLoading: isDeleting }] = useDeleteWeakAuraMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteWeakAura({ id });
      toast.success("WeakAura supprimée avec succès");
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la WeakAura:", error);
      toast.error("Erreur lors de la suppression de la WeakAura");
    }
  };

  const handleEditSuccess = (data: any) => {
    console.log("WeakAura modifiée avec succès:", data);
  };

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
            <div key={weakAura.id} className="flex flex-col gap-4 relative max-w-2xl">
              <WeakAuraCard weakAura={weakAura} />
              <div className="absolute top-2 -right-4 flex flex-col gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="z-10 h-8 w-8 p-0"
                  onClick={() => handleDelete(weakAura.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <EditWeakAuraDialog weakAura={weakAura} onSuccess={handleEditSuccess} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
