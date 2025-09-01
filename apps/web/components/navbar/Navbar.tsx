"use client";

import { cn } from "@/lib/utils";
// import {
//   Button,
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
//   Separator,
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@repo/ui";
import { Separator } from "@repo/ui/components/separator";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiMonitor, FiZap } from "react-icons/fi";
import { ThemeSwapper } from "./ThemeSwapper";

export function Navbar() {
  const pathname = usePathname();
  // Vérifier si le chemin actuel contient "admin"
  const isAdminPage = pathname.includes("admin");
  // État pour contrôler l'ouverture/fermeture du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Si c'est une page admin, ne pas afficher la navbar
  if (isAdminPage) {
    return null;
  }

  // Fonction pour fermer le menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="mb-10 w-full bg-navbar px-5 rounded-full max-w-[1080px] mx-auto mt-10 z-50 shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between h-16 w-full relative">
        <div className="flex items-center space-x-4 w-full">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-3xl pr-5 flex items-center relative transition-transform hover:scale-105"
          >
            <span className="font-dyna-puff dark:text-foreground">
              {"Solkarine".split("").map((letter, index) => (
                <span
                  key={index}
                  className="text-background dark:text-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                >
                  {letter}
                </span>
              ))}
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 justify-end">
          {/* Menu pour tous les appareils */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <div className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                <FaBars className="h-6 w-6 text-white hover:text-white/80" />
              </div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] p-6 space-y-6 flex flex-col border-l border-accent/20 backdrop-blur-md"
            >
              <div className="flex flex-col justify-between h-full">
                {/* <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Menu</h2>
                  <p className="text-sm text-muted-foreground">Navigation du site</p>
                </div> */}
                {/* liens navbar */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FiMonitor className="text-primary" />
                      <h3 className="text-base font-medium">Interface</h3>
                    </div>
                    <Separator className="bg-accent/30" />
                    <div className="space-y-1 pl-2">
                      {[
                        { href: "/interface/addons", label: "Addons" },
                        { href: "/interface/weak-auras", label: "Weak Auras" },
                        { href: "/interface/addons-profiles", label: "Profils d'addons" },
                      ].map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={closeMenu}
                            className={cn(
                              "flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-accent/20 hover:translate-x-1",
                              isActive &&
                                "bg-accent/30 text-primary font-medium translate-x-1 border-l-2 border-primary",
                            )}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* liens mythic + */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FiZap className="text-primary" />
                      <h3 className="text-base font-medium">Mythic +</h3>
                    </div>
                    <Separator className="bg-accent/30" />
                    <div className="space-y-1 pl-2">
                      {[
                        // { href: "/mythic-plus/tips", label: "Tips" },
                        { href: "/mythic-plus/routes", label: "Routes" },
                        { href: "/mythic-plus/talents", label: "Talents" },
                      ].map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={closeMenu}
                            className={cn(
                              "flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-accent/20 hover:translate-x-1",
                              isActive &&
                                "bg-accent/30 text-primary font-medium translate-x-1 border-l-2 border-primary",
                            )}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* paramètres */}
                <div className="space-y-4 mt-auto pt-6">
                  {/* <div className="flex items-center gap-2">
                    <FiSettings className="text-muted-foreground" />
                    <h3 className="text-base font-medium text-muted-foreground">Paramètres</h3>
                  </div> */}
                  <Separator className="bg-accent/30" />
                  <div className="px-4 py-2">
                    <ThemeSwapper />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
