import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Download, Package, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InterfacePage() {
  const imageDivOverlay = "absolute inset-0 bg-gradient-to-tl from-black/50 to-transparent";

  const interfaceCards = [
    {
      title: "Addons",
      description: "Ma collection d'addons recommandés",
      content: "Découvrez les addons que j'utilise pour améliorer mon expérience de jeu.",
      image: frontendImageLink.addons,
      alt: "Addons",
      icon: <Package size={20} />,
      link: "/interface/addons",
      buttonText: "Voir les addons",
    },
    {
      title: "WeakAuras",
      description: "Mes WeakAuras personnalisés",
      content: "Accédez à ma collection de WeakAuras pour optimiser votre interface de combat.",
      image: frontendImageLink.weakAuras,
      alt: "WeakAuras",
      icon: <Wand2 size={20} />,
      link: "/interface/weak-auras",
      buttonText: "Voir les WeakAuras",
    },
    {
      title: "Profils d'addons",
      description: "Ma configuration d'addons",
      content: "Téléchargez et importez ma configuration d'addons pour une interface complète.",
      image: frontendImageLink.addonProfiles,
      alt: "Addon Profiles",
      icon: <Download size={20} />,
      link: "/interface/addons-profiles",
      buttonText: "Voir la configuration",
    },
  ];

  return (
    <section className="dashboard-section">
      <h1>Interface</h1>
      {/* <p className="text-muted-foreground mb-8">
        Découvrez mes outils pour personnaliser votre interface World of Warcraft
      </p> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interfaceCards.map((card, index) => (
          <Card
            key={index}
            className="bg-card hover:bg-card/90 transition-colors justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <Image src={card.image} alt={card.alt} fill className="object-cover opacity-30" />
              <div className={imageDivOverlay}></div>
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                {card.icon}
                {card.title}
              </CardTitle>
              <CardDescription className="text-foreground">{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="grow-0 relative z-10 bg-background/30 !w-fit p-4">
              <p>{card.content}</p>
            </CardContent>
            <CardFooter className="relative z-10">
              <Button asChild variant="default">
                <Link href={card.link}>{card.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
