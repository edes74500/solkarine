"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Season } from "@repo/types";

interface ChangeSeasonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedSeason: Season | null;
  isLoading: boolean;
}

export function ChangeSeasonDialog({
  isOpen,
  onClose,
  onConfirm,
  selectedSeason,
  isLoading,
}: ChangeSeasonDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation de changement de saison</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de changer la saison active pour{" "}
            <span className="font-semibold">{selectedSeason?.name}</span>. Cette action va supprimer définitivement
            toutes les données concernant les astuces, routes et talents de la saison précédente.
            <br />
            <br />
            Êtes-vous sûr de vouloir continuer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isLoading ? "En cours..." : "Confirmer le changement"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 