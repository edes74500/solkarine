import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InterfacePage() {
  const addonsImage = frontendImageLink.addons;
  const weakAurasImage = frontendImageLink.weakAuras;
  const addonProfilesImage = frontendImageLink.addonProfiles;

  const guides = [
    {
      title: "Addons",
      description: "Découvrez les addons que j'utilise pour améliorer mon expérience de jeu.",
      image: addonsImage,
      alt: "Addons",
      link: "/interface/addons",
      linkText: "Voir les addons",
    },
    {
      title: "WeakAuras",
      description: "Accédez à ma collection de WeakAuras pour optimiser votre interface de combat.",
      image: weakAurasImage,
      alt: "WeakAuras",
      link: "/interface/weak-auras",
      linkText: "Voir les WeakAuras",
    },
    {
      title: "Profils d'addons",
      description: "Téléchargez et importez ma configuration d'addons pour une interface complète.",
      image: addonProfilesImage,
      alt: "Profils d'addons",
      link: "/interface/addons-profiles",
      linkText: "Voir la configuration",
    },
  ];

  return (
    <section className="dashboard-section">
      <h1>
        <Image src={frontendImageLink.wow_logo} alt="wow logo" width={40} height={40} className="w-10 h-10" />
        Interface
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {guides.map((item, index) => (
          <Link
            key={index}
            className="group relative overflow-hidden rounded-lg border border-primary/30 bg-black/40 backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            href={item.link}
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
              <Button asChild variant="link" className="p-0 justify-start group text-white">
                <div className="flex items-center">
                  {item.linkText}
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
