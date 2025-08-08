import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { AlertCircle } from "lucide-react";

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export function ErrorCard({
  message = "Erreur lors du chargement des données",
  onRetry,
  title = "Erreur",
}: ErrorCardProps) {
  return (
    <Card className="border-destructive bg-destructive/5 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold text-destructive">{title}</h3>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-destructive/90 mb-4">{message}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-destructive text-destructive hover:bg-destructive/10"
          >
            Réessayer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
