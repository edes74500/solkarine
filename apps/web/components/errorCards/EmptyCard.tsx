import { Card, CardContent } from "@repo/ui/components/card";
import { Frown, Smile } from "lucide-react";

interface EmptyCardProps {
  title?: string;
  message?: string;
  className?: string;
}

export function EmptyCard({
  title = "Cette section est aussi vide que mon frigo un dimanche soir (ou que la motivation d'un lundi matin)",
  message = "N'hésitez pas à revenir plus tard, nous préparons quelque chose d'extraordinaire",
  className = "",
}: EmptyCardProps) {
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative h-40 w-40 mb-6">
          <div className="absolute animate-bounce">
            <Frown className="h-20 w-20 text-muted-foreground" />
          </div>
          <div className="absolute right-0 bottom-0 animate-pulse">
            <Smile className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{message}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground"></div>

        {/* <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
          Tenter sa chance
        </Button> */}
      </CardContent>
    </Card>
  );
}
