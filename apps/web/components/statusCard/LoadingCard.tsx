import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { LoadingSpinner } from "../spinners/LoadingSpinner";

export function LoadingCard() {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-center">
        <h3 className="font-semibold text-primary">Chargement en cours</h3>
      </CardHeader>
      <CardContent className="pt-2 flex flex-col items-center">
        <LoadingSpinner />
        <p className="text-muted-foreground text-sm mt-2">Veuillez patienter pendant le chargement des données...</p>
      </CardContent>
    </Card>
  );
}
