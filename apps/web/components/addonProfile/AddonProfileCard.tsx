"use client";

import YetAnotherLightBox from "@/components/cdn/images/YetAnotherLightBox";
import { AddonProfileDBWithAddonPopulated } from "@repo/types/dist";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardTitle } from "@repo/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Check, Copy, Info } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface AddonProfileCardProps {
  addonProfile: AddonProfileDBWithAddonPopulated;
}

export default function AddonProfileCard({ addonProfile }: AddonProfileCardProps) {
  const [imageError, setImageError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const openImageViewer = useCallback((index: number = 0) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeImageViewer = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date invalide";
      }
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
    } catch (error) {
      console.error("Erreur de formatage de date:", error);
      return "Date invalide";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(addonProfile.export_string);
    setCopied(true);
    toast.success("Profil copié dans le presse-papiers!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg w-full !p-0 h-full min-h-40">
      <div className="flex flex-row !h-full ">
        <div className="relative shrink-0 w-1/3 ">
          {!imageError && addonProfile.screenshots && addonProfile.screenshots.length > 0 ? (
            <>
              <Image
                src={addonProfile.screenshots[0]}
                alt={addonProfile.name}
                fill
                className="object-cover cursor-pointer h-full !w-full"
                onError={() => setImageError(true)}
                onClick={() => openImageViewer(0)}
              />
              <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs">
                {formatDate(addonProfile.updatedAt)}
              </Badge>
              <YetAnotherLightBox
                open={lightboxOpen}
                close={closeImageViewer}
                slides={addonProfile.screenshots}
                index={lightboxIndex}
                showArrows={true}
                showThumbnails={true}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
              <span className="text-gray-500 dark:text-gray-400">Image non disponible</span>
              <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs">
                {formatDate(addonProfile.updatedAt)}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow p-2 px-4 justify-between">
          {/* topContent */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="line-clamp-1 text-lg">
                {addonProfile.name}
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                  <Avatar className="w-4 h-4 shrink-0 shadow-sm shadow-black">
                    <AvatarImage src={addonProfile.addon_id.imageUrl} />
                    <AvatarFallback>{addonProfile.addon_id.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{addonProfile.addon_id.name}</span>
                </div>
              </CardTitle>
            </div>

            {addonProfile.info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[200px]">{addonProfile.info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* description */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400 mt-2 cursor-pointer">
                  {addonProfile.description}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px]">{addonProfile.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* bottomContent */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {addonProfile.screenshots && addonProfile.screenshots.length > 1 ? (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {addonProfile.screenshots.slice(1).map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative h-10 w-16 shrink-0 cursor-pointer"
                    onClick={() => openImageViewer(index + 1)}
                  >
                    <Image
                      src={screenshot}
                      alt={`${addonProfile.name} screenshot ${index + 2}`}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-16 w-24 shrink-0" />
            )}
            {addonProfile.export_string && (
              <div className="flex items-center gap-2 mt-auto pt-2">
                <span className="text-xs font-medium">Copier le profil:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={copyToClipboard}>
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copié!" : "Copier le profil"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
