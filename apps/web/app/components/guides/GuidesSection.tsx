import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GuidesSection() {
  const guides = [
    {
      title: "Addons",
      description: "Découvrez les addons que j'utilise pour améliorer mon expérience de jeu",
      image: frontendImageLink.addons,
      alt: "Addons",
      link: "/interface/addons",
      linkText: "Voir les addons",
    },
    {
      title: "WeakAuras",
      description: "Accédez à ma collection de WeakAuras pour optimiser votre interface de combat",
      image: frontendImageLink.weakAuras,
      alt: "WeakAuras",
      link: "/interface/weak-auras",
      linkText: "Voir les WeakAuras",
    },
    {
      title: "Profils d'addons",
      description: "Téléchargez et importez ma configuration d'addons pour une interface complète",
      image: frontendImageLink.addonProfiles,
      alt: "Profils d'addons",
      link: "/interface/addons-profiles",
      linkText: "Voir la configuration",
    },
    {
      title: "Routes",
      description: "Routes optimisées pour tous les donjons de la saison actuelle",
      image: frontendImageLink.routes,
      alt: "Routes",
      link: "/mythic-plus/routes",
      linkText: "Voir les routes",
    },
    {
      title: "Talents",
      description: "Configurations de talents recommandées pour chaque donjon",
      image: frontendImageLink.talents,
      alt: "Talents",
      link: "/mythic-plus/talents",
      linkText: "Voir les talents",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {guides.map((item, index) => (
            <Card key={index} className="overflow-hidden border-primary/30 bg-card backdrop-blur-sm pt-0">
              <Link href={item.link} className="relative h-36 block">
                <Image src={item.image} alt={item.alt} fill className="object-cover opacity-70" quality={90} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </Link>
              <CardHeader className="py-3">
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="text-xs">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 pb-3">
                <Button asChild variant="link" className="p-0 group">
                  <Link href={item.link} className="flex items-center">
                    {item.linkText}
                    <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
