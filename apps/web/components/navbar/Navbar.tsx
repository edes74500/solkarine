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
import { Button } from "@repo/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Separator } from "@repo/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { Menu, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwapper } from "./ThemeSwapper";

export function Navbar() {
  const pathname = usePathname();
  // Vérifier si le chemin actuel contient "admin"
  const isAdminPage = pathname.includes("admin");

  // Si c'est une page admin, ne pas afficher la navbar
  if (isAdminPage) {
    return null;
  }

  return (
    <nav className="z-50  mb-10 w-full bg-navbar px-5 rounded-full max-w-[1080px] mx-auto mx-5 mt-10">
      <div className="mx-auto  flex items-center justify-between h-16 w-full relative">
        <div className="flex items-center space-x-4 w-full">
          {/* Logo */}
          <Link href="/" className="font-bold text-3xl  pr-5 flex items-center relative">
            <div className="relative">
              <Image src="/img/cat/cat_1_low.png" alt="Logo chat" width={70} height={70} />
            </div>
            <span className="z-10 font-dyna-puff">Solkarine</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 w-full justify-end">
          {/* Logo */}
          {/* <Link href="/" className="font-bold text-xl font-mono pr-5">
            Solkarine
          </Link> */}

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex items-baseline space-x-4">
                {[
                  // { href: "/", label: "Accueil" },
                  // { href: "/projects", label: "Mes projets" },
                  // { href: "/blog", label: "Blog" },
                ].map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <NavigationMenuItem key={href}>
                      <NavigationMenuLink
                        asChild
                        className={cn(navigationMenuTriggerStyle(), isActive && "bg-accent/50 text-accent-foreground")}
                      >
                        <Link href={href}>{label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}

                <NavigationMenuItem>
                  <NavigationMenuTrigger onMouseEnter={() => console.log("Mouse entered")}>
                    Interface
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="animate-in slide-in-from-bottom-60 duration-100 ease-in-out">
                    <ul className="grid w-[200px] gap-2 p-2">
                      {[
                        { href: "/interface/addons", label: "Addons" },
                        { href: "/interface/weak-auras", label: "Weak Auras" },
                        { href: "/interface/addons-profiles", label: "Profils d'addons" },
                        // { href: "/resume", label: "Résumé" },
                      ].map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                          <li key={href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={href}
                                className={cn(
                                  "block px-3 py-2 text-sm rounded-md",
                                  isActive && "bg-accent/50 text-accent-foreground",
                                )}
                              >
                                {label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onMouseEnter={() => console.log("Mouse entered")}>
                    Mythic +
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="animate-in slide-in-from-bottom-60 duration-100 ease-in-out">
                    <ul className="grid w-[200px] gap-2 p-2">
                      {[
                        { href: "/mythic-plus/tips", label: "Tips" },
                        { href: "/mythic-plus/routes", label: "Routes" },
                        { href: "/mythic-plus/talents", label: "Talents" },
                      ].map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                          <li key={href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={href}
                                className={cn(
                                  "block px-3 py-2 text-sm rounded-md",
                                  isActive && "bg-accent/50 text-accent-foreground",
                                )}
                              >
                                {label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {/* Right icons (desktop) */}
                <div className="hidden md:flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 flex flex-col gap-2 text-sm">
                      <ThemeSwapper />
                    </PopoverContent>
                  </Popover>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-1 ">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="!h-7 !w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4 space-y-4 items-center">
              <SheetHeader hidden>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigation</SheetDescription>
              </SheetHeader>
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="flex flex-col space-y-1">
                  {[
                    { href: "/", label: "Accueil" },
                    { href: "/work", label: "Mes travaux" },
                    { href: "/blog", label: "Blog" },
                    { href: "/about", label: "À propos" },
                    { href: "/contact", label: "Contact" },
                    { href: "/resume", label: "CV" },
                  ].map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <NavigationMenuItem key={href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className={cn(
                              "block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700",
                              isActive && "bg-accent/50 text-accent-foreground",
                            )}
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              <Separator className="!my-0" />
              <ThemeSwapper />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
