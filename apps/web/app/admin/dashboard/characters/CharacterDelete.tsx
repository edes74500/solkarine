"use client";

import { useDeleteCharacterMutation } from "@/redux/api/character.apiSlice";
import { Button } from "@repo/ui/components/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function CharacterDelete({ characterId }: { characterId: string }) {
  const [deleteCharacter] = useDeleteCharacterMutation();

  const handleDelete = async () => {
    try {
      await deleteCharacter(characterId);
      toast.success("Personnage supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du personnage:", error);
      toast.error("Erreur lors de la suppression du personnage");
    } finally {
      window.location.reload();
    }
  };
  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete()}>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </div>
  );
}
