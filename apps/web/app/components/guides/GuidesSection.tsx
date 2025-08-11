import { frontendImageLink, SOCIAL_MEDIA_LINK } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default function GuidesSection() {
  const mythicplusImage = frontendImageLink.mythicplus;
  const interfaceImage = frontendImageLink.interface;
  const communityImage = frontendImageLink.community_button;
  const guides = [
    {
      title: "Mythic+",
      description: "Découvrez mes routes, les talents que j'utilise et des tips pour simplifier vos runs.",
      image: mythicplusImage,
      alt: "Mythic+",
      link: "/mythic-plus",
      linkText: "Voir les guides",
    },
    {
      title: "Addons & WeakAuras",
      description: "Optimisez votre interface avec mes configurations personnalisées.",
      image: interfaceImage,
      alt: "Addons & WeakAuras",
      link: "/interface",
      linkText: "Decouvrir mes outils",
    },
    {
      title: "Communauté",
      description: "Rejoignez une communauté passionnée et bienveillante de joueurs.",
      image: communityImage,
      alt: "Communauté",
      buttons: [
        { icon: <FaDiscord className="mr-1 h-4 w-4 text-[#5865F2]" />, text: "Discord" },
        {
          icon: (
            <Image src={frontendImageLink.wow_logo} alt="wow_logo" width={24} height={24} className="mr-1 h-4 w-4" />
          ),
          text: "Wow",
        },
      ],
    },
  ];

  return (
    <section className="my-15 ">
      {/* <div className="absolute inset-0 w-full h-full">
        <Image
          src={frontendImageLink.community_button}
          alt="guides background"
          className="w-full h-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/10"></div>
      </div> */}

      <div className="relative z-10 flex flex-col  w-full px-4">
        <h2>
          <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10" />
          Mes guides
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {guides.map((item, index) => (
            <Link
              key={index}
              className="group relative overflow-hidden rounded-lg border border-primary/30 bg-black/40 backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              href={item.link || SOCIAL_MEDIA_LINK.DISCORD}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-50"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative z-10 p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold mb-3 text-white drop-shadow-md">{item.title}</h2>
                <p className="text-white mb-4 flex-grow backdrop-blur-sm bg-black/40 p-3 rounded-lg border border-primary/30 drop-shadow-md">
                  {item.description}
                </p>
                {item.link ? (
                  <Button asChild variant="link" className="p-0 justify-start group text-white">
                    <div className="flex items-center">
                      {item.linkText}
                      <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Button>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {item.buttons?.map((button, buttonIndex) => (
                      <Button
                        key={buttonIndex}
                        variant="outline"
                        size="sm"
                        className="flex items-center bg-primary/80 hover:bg-primary text-white border-0 transition-colors gap-0"
                      >
                        {button.icon}
                        {button.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
