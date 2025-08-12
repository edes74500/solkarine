import { Card, CardContent } from "@repo/ui/components/card";

interface EmptyCardProps {
  title?: string;
  message?: string;
  className?: string;
}

export function EmptyCard({
  title = "",
  message = "N'hésitez pas à revenir plus tard, nous préparons quelque chose d'extraordinaire",
  className = "",
}: EmptyCardProps) {
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative h-40 w-40 mb-6">
          <div className="relative w-full h-full">
            <img
              src="https://i.pinimg.com/originals/ac/35/96/ac359671bf3fcc577817a77c49746cd2.gif"
              alt="Animation vide"
              className="w-full h-full object-contain"
            />
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
