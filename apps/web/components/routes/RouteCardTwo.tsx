"use client";

import { frontendImageLink } from "@repo/constants/dist";
import { RouteDBWithDungeonPopulated } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardTitle } from "@repo/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Check, Copy, Info, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { toast } from "sonner";

interface RouteCardProps {
  route: RouteDBWithDungeonPopulated;
  className?: string;
}

export function RouteCardTwo({ route, className = "" }: RouteCardProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-current" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(route.lien_mdt);
    setCopied(true);
    toast.success("Lien copié dans le presse-papiers!");
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${className} w-full !p-0`}>
      <div className="flex flex-row">
        <div className="relative w-1/3 shrink-0 aspect-video">
          {!imageError ? (
            <>
              <Image
                src={route.image}
                alt={route.name}
                fill
                // width={300}
                // height={200}
                className="object-cover cursor-pointer h-full w-full"
                onError={() => setImageError(true)}
                onClick={openImageViewer}
              />
              <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs z-10">
                {formatDate(route.updatedAt.toString())}
              </Badge>
              {isViewerOpen && (
                <ImageViewer
                  src={[route.image]}
                  currentIndex={0}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  }}
                />
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
              <span className="text-gray-500 dark:text-gray-400">Image non disponible</span>
              <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs">
                {formatDate(route.updatedAt.toString())}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow p-2 px-4">
          <div className="flex items-center gap-2 mb-1">
            <Avatar className="w-4 h-4 shrink-0 shadow-sm shadow-black">
              <AvatarImage src={route.dungeon_id.icon_url} />
              <AvatarFallback>{route.dungeon_id.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-muted-foreground">{route.dungeon_id.name}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild> */}
              <CardTitle className="line-clamp-1 text-lg">{route.name}</CardTitle>
              {/* </TooltipTrigger>
                  <TooltipContent> */}
              {/* <p>{route.name}</p> */}
              {/* </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
            {route.info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[100px]">{route.info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400 mt-2">{route.description}</p>

          <div className="flex gap-10 mt-3">
            <div className="flex-col items-center gap-2">
              <span className="text-sm font-medium">Difficulté:</span>
              <div className="flex text-amber-500">{renderStars(route.difficulty)}</div>
            </div>
            <div className="flex-col items-center gap-2">
              <span className="text-sm font-medium">Vitesse:</span>
              <div className="flex text-green-500">{renderStars(route.speed)}</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full overflow-hidden">
                <Image src={frontendImageLink.m_key} alt="Niveau de clé" width={20} height={20} />
              </div>
              <span className="text-sm font-medium">Key Level:</span>
              <Badge variant="secondary">
                {route.key_level.min} - {route.key_level.max}
              </Badge>
            </div>

            {route.lien_mdt && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Lien MDT:</span>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={copyToClipboard}>
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copié!" : "Copier le lien"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
