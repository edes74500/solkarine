import { Card, CardContent } from "@repo/ui/components/card";

interface DashboardEmptyListCardProps {
  title?: string;
  message?: string;
  className?: string;
}

export function DashboardEmptyListCard({
  title = "Aucun élément à afficher",
  message = "Cette liste est actuellement vide. Ajoutez des éléments pour les voir apparaître ici.",
  className = "",
}: DashboardEmptyListCardProps) {
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative h-32 w-32 mb-6">
          <div className="relative w-full h-full">
            <img
              src="https://i.pinimg.com/originals/ac/35/96/ac359671bf3fcc577817a77c49746cd2.gif"
              alt="Liste vide"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
