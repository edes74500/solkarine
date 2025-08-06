import { Card, CardContent } from "@repo/ui/components/card";

interface ErrorCardProps {
  message?: string;
}

export function ErrorCard({ message = "Erreur lors du chargement des données" }: ErrorCardProps) {
  return (
    <Card className="border-red-300">
      <CardContent className="pt-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  );
}
