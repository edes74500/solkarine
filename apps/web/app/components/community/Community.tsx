import { frontendImageLink, SOCIAL_MEDIA_LINK } from "@repo/constants/dist";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Community() {
  return (
    <section className="gap-8 items-center w-full min-h-[10vh] mx-auto items-center justify-center flex flex-col font-dyna-puff">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Image
          src={frontendImageLink.wow_logo}
          alt="discord"
          width={24}
          height={24}
          className="w-8 h-8 text-purple-500"
        />
        Ma communauté sur wow
      </h2>
      <div className="relative w-full max-w-md h-20 mx-auto overflow-hidden rounded-lg ring-2 ring-primary/80 dark:ring-primary/20 shadow-xl group hover:scale-[1.02] transition-all duration-300">
        <Image
          src={frontendImageLink.community_button}
          alt="community"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-secondary/40 group-hover:opacity-80 transition-opacity duration-300"></div>
        <Button
          variant="outline"
          asChild
          className="absolute inset-0 w-full h-full bg-background/20  hover:bg-background/30 text-white tracking-wide font-dyna-puff text-lg font-bold border-0 overflow-hidden"
        >
          <Link
            href={SOCIAL_MEDIA_LINK.WOW_COMMUNITY}
            target="_blank"
            className="flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300 tracking-widest bg-black/10 hover:bg-black/20 hover:!text-white"
          >
            Rejoindre la communauté <FaArrowRight className="group-hover:animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
