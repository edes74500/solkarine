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
    <>
      <ContentWidthWrapper>
        <div className="font-sans flex flex-col gap-8 max-w-full mb-">
          {/* Hero Section */}

          <HeroSection />

          <Separator />
          {/* </div>
      </ContentWidthWrapper> */}
          {/* Guides Section */}
          <GuidesSection />

          {/* <ContentWidthWrapper>
        <div className="font-sans flex flex-col gap-8 max-w-full "> */}
          <Separator />
          {/* Twitch Section */}
          <TwitchSection />
          {/* </div>
      </ContentWidthWrapper> */}
          <Separator />

          {/* Community Section */}
          <Community />

          <Separator />
          {/* <ContentWidthWrapper>
        <div className="font-sans flex flex-col gap-8 max-w-full "> */}
          {/* Guides Section */}
          {/* <GuidesSection /> */}

          {/* <Separator /> */}

          {/* Characters Section */}
          <CharactersSection />
        </div>
      </ContentWidthWrapper>
    </>
  );
}
