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
        {/* <div className="relative w-full h-full max-w-[100%] max-h-[100%] z-10">
          <Image src={frontendImageLink.wow_logo} alt="WoW background" className="object-contain" fill sizes="100vw" />
        </div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"></div>
      </div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col">
          <h2 className="mb-0">
            <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10" />
            <span>Mes Personnages</span>
          </h2>

          {/* <div className="text-foreground ">
            <p className=" leading-relaxed">
              Voici les personnages que je joue actuellement. Cliquez sur un personnage pour voir ses détails.
            </p>
          </div> */}
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
                {Object.entries(sortedCharactersData).map(([key, char]) => {
                  const classColor = getClassColor(char.class);
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="border-2 border-transparent data-[state=active]:border-current rounded-lg justify-start px-4 py-3 flex items-center gap-3 bg-stone-500 dark:bg-card backdrop-blur-sm text-white hover:bg-stone-500/80 dark:hover:bg-card/80 transition-all duration-200 [&[data-state=active]]:bg-stone-500/90 dark:[&[data-state=active]]:bg-card/90 [&[data-state=active]]:shadow-md hover:shadow-lg w-full text-left hover:cursor-pointer"
                      style={{
                        ["--class-color" as any]: classColor,
                        ["--border-color" as any]: `var(--class-color)`,
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div
                        className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                        style={{ borderColor: classColor }}
                      >
                        <Image src={char.thumbnail_url} alt={char.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white" style={{ color: classColor }}>
                          {char.name}
                        </span>
                        <span className="text-xs text-white">
                          {char.class} - {char.race}
                        </span>
                        {char.mythic_plus_scores_by_season[0]?.scores?.all !== 0 && (
                          <div
                            className="text-sm font-medium px-2 py-0.5 rounded-sm mt-1 w-fit"
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
