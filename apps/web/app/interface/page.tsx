import { frontendImageLink } from "@repo/constants";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Download, Package, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InterfacePage() {
  const addonsImage = frontendImageLink.addons;
  const weakAurasImage = frontendImageLink.weakAuras;
  const addonProfilesImage = frontendImageLink.addonProfiles;

  const imageDivOverlay = "absolute inset-0 bg-gradient-to-br from-card/80 to-card/0";

  return (
    <section className="dashboard-section">
      <h1>Interface</h1>
      <p className="text-muted-foreground mb-8">
        Découvrez mes outils pour personnaliser votre interface World of Warcraft
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card hover:bg-card/90 transition-colors justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={addonsImage} alt="Addons" fill className="object-cover opacity-30" />
            <div className={imageDivOverlay}></div>
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              Addons
            </CardTitle>
            <CardDescription>Ma collection d'addons recommandés</CardDescription>
          </CardHeader>
          <CardContent className="grow-0 relative z-10">
            <p>Découvrez les addons que j'utilise pour améliorer mon expérience de jeu.</p>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button asChild variant="default">
              <Link href="/interface/addons">Voir les addons</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card hover:bg-card/90 transition-colors justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={weakAurasImage} alt="WeakAuras" fill className="object-cover opacity-30" />
            <div className={imageDivOverlay}></div>
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Wand2 size={20} />
              WeakAuras
            </CardTitle>
            <CardDescription>Mes WeakAuras personnalisés</CardDescription>
          </CardHeader>
          <CardContent className="grow-0 relative z-10">
            <p>Accédez à ma collection de WeakAuras pour optimiser votre interface de combat.</p>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button asChild variant="default">
              <Link href="/interface/weak-auras">Voir les WeakAuras</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card hover:bg-card/90 transition-colors justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={addonProfilesImage} alt="Addon Profiles" fill className="object-cover opacity-30" />
            <div className={imageDivOverlay}></div>
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Download size={20} />
              Profils d'addons
            </CardTitle>
            <CardDescription>Ma configuration d'addons</CardDescription>
          </CardHeader>
          <CardContent className="grow-0 relative z-10">
            <p>Téléchargez et importez ma configuration d'addons pour une interface complète.</p>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button asChild variant="default">
              <Link href="/interface/addons-profiles">Voir la configuration</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
