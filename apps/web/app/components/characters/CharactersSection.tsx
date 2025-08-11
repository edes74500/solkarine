import RaiderIoCard from "@/components/characters/RaiderIoCard";
import { getAllCharacters } from "@/lib/api/character";
import { fetchRaiderCharacter } from "@/lib/api/Raider.io";
import { getClassColor } from "@/utils/classColor";
import { frontendImageLink } from "@repo/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import Image from "next/image";
import { Suspense } from "react";

export default async function CharactersSection() {
  const characters = await getAllCharacters();
  console.log(characters);

  const charactersData = await Promise.all(
    characters.data.map(async (character) => {
      const data = await fetchRaiderCharacter(character.region, character.server, character.name);
      return data;
    }),
  );

  // Tri des personnages par score M+ décroissant
  const sortedCharactersData = charactersData.sort(
    (a, b) => b.mythic_plus_scores_by_season[0]?.scores?.all - a.mythic_plus_scores_by_season[0]?.scores?.all,
  );

  // Valeur par défaut du premier `value` du Tabs
  const defaultTab = Object.keys(sortedCharactersData)[0];

  return (
    <section className="flex flex-col gap-10 my-15 relative">
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <Image
          src={frontendImageLink.wow_logo}
          alt="WoW background"
          className="w-full h-full object-cover"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"></div>
      </div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col mb-8">
          <h2>
            <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10" />
            <span>Mes personnages</span>
          </h2>

          <div className="text-foreground ">
            <p className=" leading-relaxed">
              Voici les personnages que je joue actuellement. Cliquez sur un personnage pour voir ses détails.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-white/80 backdrop-blur-sm bg-black/30 rounded-lg">
                Chargement des personnages...
              </div>
            }
          >
            <Tabs
              orientation="vertical"
              defaultValue={defaultTab}
              className="w-full flex flex-col lg:flex-row items-start gap-6"
            >
              <TabsList className="shrink-0 flex flex-wrap lg:flex-col md:grid-cols-1 gap-3 p-0 bg-background h-fit bg-transparent w-full md:w-auto">
                {Object.entries(sortedCharactersData).map(([key, char]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="border border-b-[3px] border-transparent data-[state=active]:border-primary rounded-lg justify-start px-4 py-3 flex items-center gap-3 bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-200 [&[data-state=active]]:bg-black/80 [&[data-state=active]]:shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/50 shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                      <Image src={char.thumbnail_url} alt={char.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-base font-bold"
                        style={{
                          color: getClassColor(char.class),
                          textShadow: "0px 0px 3px rgba(0,0,0,0.8)",
                        }}
                      >
                        {char.name}
                      </span>
                      <span className="text-xs text-gray-200">
                        {char.class} - {char.race}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: char.mythic_plus_scores_by_season[0]?.segments?.all?.color,
                          textShadow: "0px 0px 3px rgba(0,0,0,0.8)",
                        }}
                      >
                        Score: {char.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex-1 w-full py-3">
                {Object.entries(charactersData).map(([key, char]) => (
                  <TabsContent key={key} value={key} className="!text-white w-full">
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
