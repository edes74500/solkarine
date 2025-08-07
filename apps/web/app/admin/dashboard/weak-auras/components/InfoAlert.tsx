import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export function InfoAlert() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription className="whitespace-normal !block">
        Cette section vous permet d&apos;ajouter des WeakAuras à votre collection. Vous pouvez les ajouter en utilisant
        l&apos;URL de la WeakAura. Notez que cette méthode n&apos;est pas tout à fait fiable et pourrait ne pas
        fonctionner à un moment donné. Si vous avez besoin d&apos;aide, consultez notre guide sur{" "}
        <Link href="/admin/dashboard/help" className="text-primary underline inline">
          comment publier une WeakAura
        </Link>
        .
      </AlertDescription>
    </Alert>
  );
}
