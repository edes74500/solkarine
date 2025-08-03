"use client";

import RaiderIoCard, { Character } from "@/app/components/characters/RaiderIoCard";
import RaiderIoColor from "@/app/components/characters/RaiderIoColor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { characters } from "@/data/characters";
import { getClassColor } from "@/data/classColor";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

export default function CharactersSection() {
  // 1) state pour stocker les données récupérées
  const [charsData, setCharsData] = useState<Record<string, Character>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2) pour chaque perso, on build l'URL Raider.IO et on fetch
    async function fetchAll() {
      const entries = await Promise.all(
        Object.entries(characters).map(async ([key, { name, realm, region }]) => {
          const url = new URL("https://raider.io/api/v1/characters/profile");
          url.searchParams.set("region", region);
          url.searchParams.set("realm", realm);
          url.searchParams.set("name", name);
          url.searchParams.set("fields", "mythic_plus_best_runs,mythic_plus_scores_by_season:current");
          const res = await fetch(url.toString());
          const json: Character = await res.json();
          return [key, json] as [string, Character];
        }),
      );

      setCharsData(Object.fromEntries(entries));
      setLoading(false);
    }

    fetchAll();
  }, []);

  if (loading) {
    return <div>Chargement des personnages…</div>;
  }

  // valeur par défaut du premier `value` du Tabs
  const defaultTab = Object.keys(charsData)[0];

  return (
    <section className="flex flex-col gap-6 my-20">
      <h2 className="text-2xl font-bold">Mes personnages</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full flex flex-col gap-4">
          <p className="text-muted-foreground">Voici les personnages que je joue actuellement.</p>
        </div>

        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <Tabs orientation="vertical" defaultValue={defaultTab} className="w-full flex flex-row items-start gap-4">
              <TabsList className="shrink-0 grid grid-cols-1 gap-1 p-0 bg-background h-fit bg-transparent">
                {Object.entries(charsData)
                  .sort(([, charA], [, charB]) => {
                    const scoreA = charA.mythic_plus_scores_by_season[0]?.scores?.all || 0;
                    const scoreB = charB.mythic_plus_scores_by_season[0]?.scores?.all || 0;
                    return scoreB - scoreA;
                  })
                  .map(([key, char]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="border border-b-[3px] border-transparent data-[state=active]:border-chart-5 rounded-none justify-start px-3 py-1.5 flex items-center gap-2 bg-black/90 text-white hover:bg-black/80 [&[data-state=active]]:bg-black/70 rounded-lg"
                    >
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={char.thumbnail_url}
                          alt={char.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: getClassColor(char.class),
                            // WebkitTextStroke: "0.4px rgba(0, 0, 0, 0.8)",
                            // textStroke: "1px rgba(0, 0, 0, 0.8)",
                          }}
                        >
                          {char.name}
                        </span>
                        <span className="text-xs">{char.class}</span>
                        <RaiderIoColor score={char.mythic_plus_scores_by_season[0].scores?.all || 0}>
                          <span className="text-xs">
                            {char.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}
                          </span>
                        </RaiderIoColor>
                      </div>
                    </TabsTrigger>
                  ))}
              </TabsList>
              <div className="flex-1 border rounded-md">
                {Object.entries(charsData).map(([key, char]) => (
                  <TabsContent
                    key={key}
                    value={key}
                    className="rounded-lg overflow-hidden shadow-md p-5 bg-black/70 !text-white"
                  >
                    <RaiderIoCard data={char} />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
