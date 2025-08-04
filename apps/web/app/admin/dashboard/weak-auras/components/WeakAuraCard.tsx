"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WeakAura {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  info?: string;
}

interface WeakAuraCardProps {
  weakAura: WeakAura;
  onDelete?: (id: string) => void;
}

export function WeakAuraCard({ weakAura, onDelete }: WeakAuraCardProps) {
  const handleDelete = () => {
    console.log(`Suppression de la WeakAura: ${weakAura.id} - ${weakAura.title}`);
    if (onDelete) {
      onDelete(weakAura.id);
    }
  };

  return (
    <Card className="overflow-hidden max-w-2xl !p-0 relative">
      {/* Bouton de suppression en haut à droite */}
      <Button
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 z-10 h-8 w-8 p-0"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

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
        </div>
        <div className="flex flex-col justify-between md:w-2/3 p-4 gap-4">
          <CardHeader>
            <CardTitle className="line-clamp-1">{weakAura.title}</CardTitle>
            <CardDescription className="line-clamp-3">{weakAura.description}</CardDescription>
          </CardHeader>
          {weakAura.info && (
            <CardContent>
              <p className="text-xs text-gray-500 line-clamp-3 backdrop-blur-sm bg-white/30 text-white p-2 rounded">
                {weakAura.info}
              </p>
            </CardContent>
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
