"use client";

import { frontendImageLink } from "@repo/constants";
import { AddonClient } from "@repo/types";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AddonCardProps {
  addon: AddonClient;
}

export function AddonCard({ addon }: AddonCardProps) {
  const fallbackImage = frontendImageLink.fallbackAddon;
  return (
    <Card className="max-w-2xl w-2xl !p-0 relative">
      <div className="flex flex-col md:flex-row min-h-40">
        {/* <Link href={addon.addonUrl} target="_blank" rel="noopener noreferrer" className="relative"> */}
        <div
          className="relative h-48 md:h-auto md:w-1/3 rounded-l-lg overflow-hidden cursor-pointer"
          onClick={() => {
            window.open(addon.addonUrl, "_blank");
          }}
        >
          <Image
            src={addon.imageUrl || fallbackImage}
            alt={addon.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = "/img/fallbackAddon.png";
            }}
          />
          {/* <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
            <Badge variant="default" className="text-xs">
            Il y a {formatDistanceToNow(new Date(addon.updatedAt), { locale: fr, addSuffix: false })}
            </Badge>
            </div> */}
        </div>
        {/* </Link> */}
        <div className="flex flex-col justify-between md:w-2/3 p-4 gap-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Link href={addon.addonUrl} target="_blank" rel="noopener noreferrer">
                  <CardTitle className="line-clamp-1">{addon.name}</CardTitle>
                </Link>
                {addon.info && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{addon.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription className="line-clamp-3">{addon.description}</CardDescription>
            </div>
          </CardHeader>

          {/* Tags */}
          {addon.tags && addon.tags.length > 0 && (
            <div className="px-4">
              <div className="flex flex-wrap gap-1">
                {addon.tags.map((tag) => (
                  <Badge key={`${addon.id}-${tag}`} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* <CardFooter className="flex justify-end">
            <Button asChild className="w-fit">
              Voir l'Addon
            </Button>
          </CardFooter> */}
        </div>
      </div>
    </Card>
  );
}
