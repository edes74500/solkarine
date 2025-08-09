import CharactersSection from "@/app/components/characters/CharactersSection";
import Community from "@/app/components/community/Community";
import GuidesSection from "@/app/components/guides/GuidesSection";
import HeroSection from "@/app/components/hero/HeroSection";
import TwitchSection from "@/app/components/twitch/TwitchSection";
import ContentWidthWrapper from "@/components/ContentWidthWrapper";
import { Separator } from "@repo/ui/components/separator";

export default async function Home() {
  let character = null;
  // try {
  //   character = await fetchRaiderCharacter("eu", "hyjal", "Solkârîne");
  //   console.log(character);
  // } catch (error) {
  //   console.error("Erreur lors de la récupération des données de Solkarîne:", error);
  // }

  return (
    <ContentWidthWrapper>
      <div className="font-sans flex flex-col gap-8 max-w-full ">
        {/* Hero Section */}

        <HeroSection />

        <Separator />

        {/* Twitch Section */}
        <TwitchSection />

        <Separator />

        {/* Community Section */}
        <Community />

        <Separator />

        {/* Guides Section */}
        <GuidesSection />

        <Separator />

        {/* Characters Section */}
        <CharactersSection />
      </div>
    </ContentWidthWrapper>
  );
}
