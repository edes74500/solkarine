import CharactersSection from "@/app/components/characters/CharactersSection";
import Community from "@/app/components/community/Community";
import GuidesSection from "@/app/components/guides/GuidesSection";
import HeroSection from "@/app/components/hero/HeroSection";
import TwitchSection from "@/app/components/twitch/TwitchSection";
import YouTubeLatest from "@/app/components/youtube/YouTubeLatest";
import ContentWidthWrapper from "@/components/ContentWidthWrapper";
import { FadeInOnView } from "@/components/layout/FramerTransition";
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
      <div className="relative w-full h-full overflow-hidden ">
        <ContentWidthWrapper>
          <div className="font-sans flex flex-col gap-8 max-w-full">
            {/* Effet lightning subtil */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-navbar/30 to-transparent blur-sm pointer-events-none select-none"></div>
            <div className="absolute top-1/3 right-0 w-1 h-40 bg-gradient-to-b from-transparent via-navbar/30 to-transparent blur-sm pointer-events-none select-none"></div>

            {/* Effets de lumière */}
            <div className="absolute top-20 left-[20%] w-[700px] h-[700px] bg-navbar dark:bg-white/20 rounded-full blur-3xl opacity-30 pointer-events-none select-none"></div>
            <div className="absolute top-[100%] right-10 w-[700px] h-[700px] bg-navbar dark:bg-white/20 rounded-full blur-3xl opacity-20 pointer-events-none select-none"></div>
            <div className="absolute bottom-[10%] left-1/3 w-[700px] h-[700px] bg-navbar rounded-full blur-3xl opacity-25 pointer-events-none select-none"></div>
            <div className="absolute top-1/4 left-1/2 w-[700px] h-[700px] bg-navbar rounded-full blur-3xl opacity-20 animate-float pointer-events-none select-none"></div>
            <div className="absolute top-[50%] left-[20%] w-[700px] h-[700px] bg-navbar dark:bg-white/20 rounded-full blur-3xl opacity-20 pointer-events-none select-none"></div>
            <div className="absolute bottom-1/4 left-1/2 w-[700px] h-[700px] bg-navbar dark:bg-white/20 rounded-full blur-3xl opacity-20 animate-float pointer-events-none select-none"></div>

            {/* Hero Section */}
            <FadeInOnView
              key="hero"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              <HeroSection />
            </FadeInOnView>

            <Separator className="bg-muted-foreground/30" />

            <FadeInOnView
              key="guides"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            >
              <GuidesSection />
            </FadeInOnView>

            <Separator className="bg-muted-foreground/30" />

            <FadeInOnView
              key="characters"
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <CharactersSection />
            </FadeInOnView>

            <Separator className="bg-muted-foreground/30" />

            <FadeInOnView
              key="community"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Community />
            </FadeInOnView>

            <Separator className="bg-muted-foreground/30" />

            <FadeInOnView
              key="youtube"
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <YouTubeLatest handle="@SolkarineTwitch" />
            </FadeInOnView>

            <Separator className="bg-muted-foreground/30" />

            <FadeInOnView
              key="twitch"
              variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TwitchSection />
            </FadeInOnView>
          </div>
        </ContentWidthWrapper>
      </div>
    </>
  );
}
