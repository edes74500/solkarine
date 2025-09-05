import RaiderIoCardHome from "@/components/characters/RaiderIoCardHome";
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
      <div className="absolute inset-0 w-[90%] h-[90%] mx-auto my-auto opacity-10 pointer-events-none flex items-center justify-center !mb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"></div>
      </div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col text-center items-center">
          <h2 className="mb-0">
            <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10" />
            <span>Mes Personnages</span>
          </h2>
        </div>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="p-8 text-center text-card-foreground/80 backdrop-blur-sm bg-card/90 rounded-lg">
                Chargement des personnages...
              </div>
            }
          >
            <Tabs
              orientation="vertical"
              defaultValue={defaultTab}
              className="w-full flex flex-col lg:flex-row items-start gap-6"
            >
              <TabsList className="shrink-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-3 p-0 bg-background h-fit bg-transparent w-full md:w-auto">
                {Object.entries(sortedCharactersData).map(([key, char]) => {
                  const classColor = getClassColor(char.class);
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="border-2 border-transparent data-[state=active]:border-current rounded-lg justify-start px-4 py-3 flex items-center gap-3 bg-card/90 backdrop-blur-sm text-card-foreground hover:bg-card/95 transition-all duration-200 [&[data-state=active]]:shadow-md hover:shadow-lg w-full text-left hover:cursor-pointer"
                      style={{
                        ["--class-color" as any]: classColor,
                        // borderColor: classColor,
                        // boxShadow: `0 0 8px ${classColor}40`,
                      }}
                    >
                      <div
                        className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                        style={{ borderColor: classColor }}
                      >
                        <Image src={char.thumbnail_url} alt={char.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-card-foreground">{char.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {char.class} - {char.race}
                        </span>
                        {char.mythic_plus_scores_by_season[0]?.scores?.all !== 0 && (
                          <div
                            className="text-sm font-medium px-2 py-0.5 rounded-sm mt-1 w-fit text-white"
                            style={{
                              backgroundColor: char.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#666",
                            }}
                          >
                            {char.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              <div className="flex-1 w-full">
                {Object.entries(charactersData).map(([key, char]) => (
                  <TabsContent key={key} value={key} className="text-card-foreground w-full">
                    <RaiderIoCardHome data={char} />
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
