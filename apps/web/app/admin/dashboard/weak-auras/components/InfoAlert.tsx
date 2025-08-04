import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function InfoAlert() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Cette section vous permet d&apos;ajouter des WeakAuras à votre collection. Vous pouvez les ajouter en
        utilisant l&apos;URL de la WeakAura. Notez que cette méthode n&apos;est pas tout à fait fiable et pourrait ne
        pas fonctionner à un moment donné.
      </AlertDescription>
    </Alert>
  );
} 