import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GuidesSection() {
  const mythicplusImage = frontendImageLink.mythicplus;
  const interfaceImage = frontendImageLink.interface;
  const communityImage = frontendImageLink.community_button;
  const guides = [
    {
      title: "Addons & WeakAuras",
      description: "Optimisez votre interface avec mes configurations personnalisées.",
      image: interfaceImage,
      alt: "Addons & WeakAuras",
      link: "/interface",
      linkText: "Découvrir mes outils",
    },
    {
      title: "Routes et Talents",
      description: "Découvrez mes routes, les talents que j'utilise pour push les mythic+.",
      image: mythicplusImage,
      alt: "Routes et Talents",
      link: "/mythic-plus",
      linkText: "Voir les guides",
    },
  ];

  return (
    <section className="my-15">
      <div className="relative z-10 flex flex-col items-center w-full px-4 max-w-7xl mx-auto">
        {/* <h2 className="font-dyna-puff mb-8 text-center flex items-center gap-3 bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
          <Image
            src={frontendImageLink.wow_logo}
            alt="wow logo"
            width={48}
            height={48}
            className="w-12 h-12 animate-pulse"
          />
          <span className="drop-shadow-sm">Routes, Addons & Talents</span>
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          {guides.map((item, index) => (
            <Link
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-pink-300/30 bg-black/40 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.03] duration-300"
              href={item.link}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-md bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
                  {item.title}
                </h2>
                <p className="text-white mb-6 flex-grow backdrop-blur-sm bg-black/50 p-4 rounded-xl border border-pink-300/30 drop-shadow-md leading-relaxed">
                  {item.description}
                </p>
                <Button asChild variant="link" className="p-0 justify-start group text-pink-300 hover:text-pink-200">
                  <div className="flex items-center">
                    {item.linkText}
                    <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
