"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeleteWeakAuraMutation } from "@/redux/api/weakAuras.apiSlice";
import { WeakAuraClient } from "@repo/types/dist";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { HelpCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { EditWeakAuraDialog } from "./EditWeakAuraDialog";

interface WeakAuraCardProps {
  weakAura: WeakAuraClient;
  onDelete?: (id: string) => void;
}

export function WeakAuraCard({ weakAura, onDelete }: WeakAuraCardProps) {
  const [deleteWeakAura] = useDeleteWeakAuraMutation();
  const handleDelete = async () => {
    console.log(`Suppression de la WeakAura: ${weakAura.id} - ${weakAura.title}`);
    try {
      await deleteWeakAura({ id: weakAura.id });
      if (onDelete) {
        onDelete(weakAura.id);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la WeakAura:", error);
      toast.error("Erreur lors de la suppression de la WeakAura");
    }
  };

  const handleEdit = () => {
    console.log(`Edition de la WeakAura: ${weakAura.id} - ${weakAura.title}`);
  };

  const handleEditSuccess = (data: any) => {
    console.log("WeakAura modifiée avec succès:", data);
    // toast.success("WeakAura modifiée avec succès");
    // Ici vous pourriez rafraîchir la liste ou mettre à jour l'état local
  };

  return (
    <Card className="max-w-2xl !p-0 relative">
      {/* Bouton de suppression en haut à droite */}
      <Button
        variant="destructive"
        size="sm"
        className="absolute top-2 -right-4 z-10 h-8 w-8 p-0"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <div className="absolute top-12 -right-4 z-10 bg-card">
        <EditWeakAuraDialog weakAura={weakAura} onSuccess={handleEditSuccess} />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image
            src={weakAura.image.includes("media.wago.io") ? weakAura.image : "/img/fallbackWA.png"}
            alt={weakAura.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = "/img/fallbackWA.png";
            }}
          />
          <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
            <Badge variant="default" className="text-xs">
              Il y a {formatDistanceToNow(new Date(weakAura.createdAt), { locale: fr, addSuffix: false })}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-2/3 p-4 gap-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <div className="flex justify-between items-center">
                <CardTitle className="line-clamp-1">{weakAura.title}</CardTitle>
                {weakAura.info && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{weakAura.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription className="line-clamp-3">{weakAura.description}</CardDescription>
            </div>
          </CardHeader>

          {/* Tags */}
          {weakAura.tags && weakAura.tags.length > 0 && (
            <div className="px-4">
              <div className="flex flex-wrap gap-1">
                {weakAura.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <CardFooter className="flex justify-end">
            <Button asChild className="w-fit">
              <Link href={weakAura.url} target="_blank" rel="noopener noreferrer">
                Voir la WeakAura
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
