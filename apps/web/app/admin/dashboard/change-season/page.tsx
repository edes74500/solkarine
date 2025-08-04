"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DungeonClient } from "@repo/types";
import { AlertCircle, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Season {
  slug: string;
  name: string;
  blizzard_season_id: number;
  is_main_season: boolean;
  short_name: string;
  seasonal_affix: string | null;
  starts: Record<string, string>;
  ends: Record<string, string>;
  dungeons: DungeonClient[];
}

export default function ChangeSeason() {
  const [currentExpansions, setCurrentExpansions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [staticData, setStaticData] = useState<Season[] | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://raider.io/api/v1/mythic-plus/static-data?expansion_id=${currentExpansions}`,
      );
      const data = await response.json();
      // Vérifier si data.seasons existe avant d'appliquer filter
      const filteredData = data.seasons.filter(
        (season: Season) => season.is_main_season && !season.name.toLowerCase().includes("post"),
      );
      console.log("Données récupérées:", filteredData);
      setStaticData(filteredData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSeason = (season: Season) => {
    setSelectedSeason(season);
    setTimeout(() => {
      selectedRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Changer de saison</h1>

        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            En modifiant la saison active, toutes les données concernant les astuces, routes et talents seront
            définitivement effacées. Cette opération ne peut pas être annulée.
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Expansions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Choisissez une expansion pour changer de saison</p>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="expansion-input">Numéro d'expansion</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="expansion-input"
                  type="number"
                  value={currentExpansions}
                  onChange={(e) => setCurrentExpansions(Number(e.target.value))}
                  className="w-24"
                  min="1"
                />
                <span className="text-sm text-muted-foreground">
                  Expansion ID to get slugs for. 10 = The War Within, 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for
                  Azeroth, 6 = Legion
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-fit" onClick={handleFetchData} disabled={isLoading}>
              {isLoading ? "Chargement..." : "Lancer la récupération des données"}
            </Button>
          </CardFooter>
        </Card>
      </section>

      {staticData && (
        <section className="flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-bold">Saisons disponibles</h2>

          <Tabs defaultValue="main" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="main">Saisons principales</TabsTrigger>
              <TabsTrigger value="other">Autres saisons</TabsTrigger>
              <TabsTrigger value="all">Tous les donjons</TabsTrigger>
            </TabsList>

            <TabsContent value="main">
              <div className="flex flex-wrap gap-4">
                {staticData.map((season: Season) => (
                  <Card key={season.slug} className="overflow-hidden max-w-xs">
                    <CardHeader className="bg-card border-b">
                      <CardTitle>{season.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <p>ID Blizzard: {season.blizzard_season_id}</p>
                        <p>Nom court: {season.short_name}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 grow">
                      <div className="mb-4">
                        <p className="text-sm font-medium">Période:</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(season.starts.eu)} - {formatDate(season.ends.eu)}
                        </p>
                      </div>
                      <p className="font-medium mb-2">Donjons ({season.dungeons.length}):</p>
                      <div className="grid grid-cols-2 gap-2">
                        {season.dungeons.slice(0, 8).map((dungeon) => (
                          <div key={dungeon.id} className="flex items-center gap-2">
                            <div className="relative w-6 h-6 overflow-hidden rounded-sm">
                              <Image
                                src={dungeon.icon_url}
                                alt={dungeon.name}
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs truncate">{dungeon.short_name}</span>
                          </div>
                        ))}
                        {season.dungeons.length > 8 && (
                          <div className="text-xs text-muted-foreground">+{season.dungeons.length - 4} autres</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-card/50 flex ">
                      <Button variant="default" size="sm" onClick={() => handleSelectSeason(season)}>
                        Sélectionner cette saison
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* <TabsContent value="other">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staticData.seasons
                  .filter((season) => !season.is_main_season)
                  .map((season) => (
                    <Card key={season.slug} className="overflow-hidden">
                      <CardHeader className="bg-card border-b">
                        <CardTitle>{season.name}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          <p>ID Blizzard: {season.blizzard_season_id}</p>
                          <p>Nom court: {season.short_name}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="mb-4">
                          <p className="text-sm font-medium">Période:</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(season.starts.eu)} - {formatDate(season.ends.eu)}
                          </p>
                        </div>
                        <p className="font-medium mb-2">Donjons ({season.dungeons.length}):</p>
                        <div className="grid grid-cols-2 gap-2">
                          {season.dungeons.slice(0, 4).map((dungeon) => (
                            <div key={dungeon.id} className="flex items-center gap-2">
                              <div className="relative w-6 h-6 overflow-hidden rounded-sm">
                                <Image
                                  src={dungeon.icon_url}
                                  alt={dungeon.name}
                                  width={24}
                                  height={24}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs truncate">{dungeon.short_name}</span>
                            </div>
                          ))}
                          {season.dungeons.length > 8 && (
                            <div className="text-xs text-muted-foreground">+{season.dungeons.length - 4} autres</div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-card/50 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleSelectSeason(season)}>
                          Voir les détails
                        </Button>
                        <Button variant="default" size="sm">
                          Sélectionner cette saison
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent> */}

            {/* <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {staticData.dungeons.map((dungeon) => (
                  <Card key={dungeon.id} className="overflow-hidden p-0 max-w-xs grow">
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

                    <CardContent className="px-5 grow">
                      <p className="text-sm">Timer: {Math.floor(dungeon.keystone_timer_seconds / 60)} minutes</p>
                    </CardContent>

                    <CardFooter className="flex justify-between px-5 pb-5">
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                      <Button variant="default" size="sm">
                        Sélectionner
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent> */}
          </Tabs>
        </section>
      )}

      {selectedSeason && (
        <section className="flex flex-col gap-4 p-4" ref={selectedRef}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Détails de la saison: {selectedSeason.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSeason(null)}>
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
                      <span className="font-medium">ID Blizzard:</span> {selectedSeason.blizzard_season_id}
                    </li>
                    <li>
                      <span className="font-medium">Slug:</span> {selectedSeason.slug}
                    </li>
                    <li>
                      <span className="font-medium">Nom court:</span> {selectedSeason.short_name}
                    </li>
                    <li>
                      <span className="font-medium">Saison principale:</span>{" "}
                      {selectedSeason.is_main_season ? "Oui" : "Non"}
                    </li>
                    <li>
                      <span className="font-medium">Affix saisonnier:</span> {selectedSeason.seasonal_affix || "Aucun"}
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

                          <div>EU: {formatDate(selectedSeason.starts.eu)}</div>
                          <div>EU: {formatDate(selectedSeason.ends.eu)}</div>

                          <div>US: {formatDate(selectedSeason.starts.us)}</div>
                          <div>US: {formatDate(selectedSeason.ends.us)}</div>

                          <div>TW: {formatDate(selectedSeason.starts.tw)}</div>
                          <div>TW: {formatDate(selectedSeason.ends.tw)}</div>

                          <div>KR: {formatDate(selectedSeason.starts.kr)}</div>
                          <div>KR: {formatDate(selectedSeason.ends.kr)}</div>

                          <div>CN: {formatDate(selectedSeason.starts.cn)}</div>
                          <div>CN: {formatDate(selectedSeason.ends.cn)}</div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Donjons de la saison</h3>
              <div className="flex flex-wrap gap-4">
                {selectedSeason.dungeons.map((dungeon) => (
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
              <Button variant="outline" onClick={() => setSelectedSeason(null)}>
                <X className="w-4 h-4" />
                Annuler
              </Button>
              <Button variant="destructive">Utiliser cette saison</Button>
            </CardFooter>
          </Card>
        </section>
      )}
    </>
  );
}
