"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function WarningAlert() {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Attention</AlertTitle>
      <AlertDescription>
        En modifiant la saison active, toutes les données concernant les astuces, routes et talents seront
        définitivement effacées. Cette opération ne peut pas être annulée.
      </AlertDescription>
    </Alert>
  );
} 