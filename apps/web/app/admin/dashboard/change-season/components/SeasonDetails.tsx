"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Season } from "@repo/types";
import { X } from "lucide-react";
import Image from "next/image";

interface SeasonDetailsProps {
  season: Season;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function SeasonDetails({ season, onClose, onConfirm, isLoading }: SeasonDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Détails de la saison: {season.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
              Fermer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-10 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Informations</h3>
              <ul className="space-y-1">
                <li>
                  <span className="font-medium">ID Blizzard:</span> {season.blizzard_season_id}
                </li>
                <li>
                  <span className="font-medium">Slug:</span> {season.slug}
                </li>
                <li>
                  <span className="font-medium">Nom court:</span> {season.short_name}
                </li>
                <li>
                  <span className="font-medium">Saison principale:</span>{" "}
                  {season.is_main_season ? "Oui" : "Non"}
                </li>
                <li>
                  <span className="font-medium">Affix saisonnier:</span> {season.seasonal_affix || "Aucun"}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Dates</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dates">
                  <AccordionTrigger>Voir les dates par région</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Début:</div>
                      <div className="font-medium">Fin:</div>

                      <div>EU: {formatDate(season.starts.eu)}</div>
                      <div>EU: {formatDate(season.ends.eu)}</div>

                      <div>US: {formatDate(season.starts.us)}</div>
                      <div>US: {formatDate(season.ends.us)}</div>

                      <div>TW: {formatDate(season.starts.tw)}</div>
                      <div>TW: {formatDate(season.ends.tw)}</div>

                      <div>KR: {formatDate(season.starts.kr)}</div>
                      <div>KR: {formatDate(season.ends.kr)}</div>

                      <div>CN: {formatDate(season.starts.cn)}</div>
                      <div>CN: {formatDate(season.ends.cn)}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Donjons de la saison</h3>
          <div className="flex flex-wrap gap-4">
            {season.dungeons.map((dungeon) => (
              <Card key={dungeon.id} className="overflow-hidden p-0 max-w-xs grow w-xs">
                <div className="relative h-40">
                  <Image src={dungeon.background_image_url} alt={dungeon.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Image
                      src={dungeon.icon_url}
                      alt={`${dungeon.name} icon`}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <CardHeader className="px-5">
                  <h3 className="font-bold text-lg">{dungeon.name}</h3>
                  <p className="text-sm text-muted-foreground">{dungeon.short_name}</p>
                </CardHeader>

                <CardContent className="px-5 grow mb-5 justify-between">
                  <p className="text-sm">Timer: {Math.floor(dungeon.keystone_timer_seconds / 60)} minutes</p>
                  <p className="text-sm">ID: {dungeon.id}</p>
                  <p className="text-sm">Challenge Mode ID: {dungeon.challenge_mode_id}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4" />
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            Utiliser cette saison
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
} 