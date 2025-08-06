import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function AddonProfilesPage() {
  return (
    <section className="dashboard-section">
      <h1>Profils d'addons</h1>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Gestion des profils d'addons</AlertTitle>
        <AlertDescription>
          Cette section vous permet de gérer et partager les différents profils de configuration pour vos addons.
          Ajoutez, modifiez ou supprimez des profils pour les rendre disponibles aux utilisateurs.
        </AlertDescription>
      </Alert>
    </section>
  );
}
