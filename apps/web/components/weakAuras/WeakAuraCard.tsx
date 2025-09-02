"use client";

import { frontendImageLink } from "@repo/constants";
import { WeakAuraClient } from "@repo/types";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WeakAuraCardProps {
  weakAura: WeakAuraClient;
}

export function WeakAuraCard({ weakAura }: WeakAuraCardProps) {
  const fallbackImage = frontendImageLink.fallbackWA;

  return (
    <Card className="w-full !p-0 relative">
      <div className="flex flex-col md:flex-row min-h-40">
        <div
          className="relative h-48 md:h-auto md:w-1/3 rounded-l-lg overflow-hidden cursor-pointer"
          onClick={() => {
            window.open(weakAura.url, "_blank");
          }}
        >
          <Image
            src={weakAura.image.includes("media.wago.io") ? weakAura.image : fallbackImage}
            alt={weakAura.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = "/img/fallbackWA.png";
            }}
          />
          <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
            <Badge variant="default" className="text-xs">
              Il y a {formatDistanceToNow(new Date(weakAura.updatedAt), { locale: fr, addSuffix: false })}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-2/3 p-4 gap-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Link href={weakAura.url} target="_blank" rel="noopener noreferrer">
                  <CardTitle className="line-clamp-1">{weakAura.title}</CardTitle>
                </Link>
                {weakAura.info && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{weakAura.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription className="line-clamp-3">{weakAura.description}</CardDescription>
            </div>
          </CardHeader>

          {/* Tags */}
          {weakAura.tags && weakAura.tags.length > 0 && (
            <div className="px-4">
              <div className="flex flex-wrap gap-1">
                {weakAura.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* <CardFooter className="flex justify-end">
            <Button asChild className="w-fit">
              <Link href={weakAura.url} target="_blank" rel="noopener noreferrer">
                Voir la WeakAura
              </Link>
            </Button>
          </CardFooter> */}
        </div>
      </div>
    </Card>
  );
}
