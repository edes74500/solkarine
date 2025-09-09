import { frontendImageLink, SOCIAL_MEDIA_LINK } from "@repo/constants/dist";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Community() {
  return (
    <section className="gap-8 min-h-[40vh] items-center w-full mx-auto justify-center flex flex-col  relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={frontendImageLink.community_button}
          alt="community background"
          className="w-full h-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-4">
        <h2 className="font-dyna-puff text-white tracking-widest text-center">
          <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10 " />
          <span className="drop-shadow-lg">Marre de jouer seul ?</span>
        </h2>

        <p className="text-white text-center mb-8 max-w-2xl drop-shadow-md backdrop-blur-sm bg-black/40 p-4 rounded-lg border border-primary/30">
          Ras-le-bol d&apos;être stuck à Dornogal ? Rejoins ma communauté pour trouver des partenaires de Mythic+, et
          jouer ensemble dans un environnement convivial.
        </p>
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 border border-primary/30">
            <FaUsers className="text-primary text-3xl" />
            <div>
              <h3 className="text-white font-bold">Trouvez des partenaires</h3>
              <p className="text-gray-200 text-sm">Formez des groupes pour vos Mythic+ et raids</p>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 border border-primary/30">
            <FaGamepad className="text-primary text-3xl" />
            <div>
              <h3 className="text-white font-bold">Progressez ensemble</h3>
              <p className="text-gray-200 text-sm">Partagez des stratégies et améliorez votre jeu</p>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto">
          <div className="relative w-full overflow-hidden rounded-lg group hover:scale-[1.02] transition-all duration-300 font-dyna-puff">
            <Button
              variant="outline"
              asChild
              className="w-full h-12 bg-gradient-to-r from-[#5865F2]/90 to-[#7289DA]/90 hover:from-[#5865F2] hover:to-[#7289DA] text-white tracking-wide font-medium text-base border border-white/20 overflow-hidden hover:text-white"
            >
              <Link
                href={SOCIAL_MEDIA_LINK.DISCORD}
                target="_blank"
                className="flex items-center justify-center gap-2 transition-all duration-300"
              >
                <i className="fab fa-discord text-lg"></i>
                <span className="font-bold">Discord</span>
                <FaArrowRight className="ml-1 text-sm transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg group hover:scale-[1.02] transition-all duration-300 font-dyna-puff">
            <Button
              variant="outline"
              asChild
              className="w-full h-12 bg-gradient-to-r from-[#6441A4]/90 to-[#9146FF]/90 hover:from-[#6441A4] hover:to-[#9146FF] text-white tracking-wide font-medium text-base border border-white/20 overflow-hidden hover:text-white"
            >
              <Link
                href={SOCIAL_MEDIA_LINK.WOW_COMMUNITY}
                target="_blank"
                className="flex items-center justify-center gap-2 transition-all duration-300"
              >
                <i className="fas fa-users text-lg"></i>
                <span className="font-bold">Communauté WoW</span>
                <FaArrowRight className="ml-1 text-sm transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
