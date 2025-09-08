"use client";

import YetAnotherLightBox from "@/components/cdn/images/YetAnotherLightBox";
import { cn } from "@/lib/utils";
import { CLASS_AND_TALENTS, CLASS_COLORS } from "@repo/constants";
import { TalentClientWithDungeonPopulated } from "@repo/types";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Check, Copy, Info } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface TalentsCardProps {
  talent: TalentClientWithDungeonPopulated;
}

export default function TalentsCard({ talent }: TalentsCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(talent.export_string);
    setCopied(true);
    toast.success("Talent copié !");
    setTimeout(() => setCopied(false), 2000);
  }, [talent.export_string]);

  const { classData, specData, heroTalentData, classColor, className, specName, specRole } = useMemo(() => {
    const classIndex = Number(talent.class);
    const cData = CLASS_AND_TALENTS?.[classIndex as keyof typeof CLASS_AND_TALENTS] as any | undefined;

    const specIndex = Number(talent.spec);
    const sData = cData?.[specIndex] as any | undefined;

    const heroId = Number(talent.hero_talent);
    const hData = sData?.hero_talent?.[heroId];

    const color = cData ? ((CLASS_COLORS as any)[cData.name] ?? "#808080") : "#808080";
    return {
      classData: cData,
      specData: sData,
      heroTalentData: hData,
      classColor: color,
      className: cData?.name ?? "Inconnue",
      specName: sData?.name ?? "Inconnue",
      specRole: sData?.role ?? "",
    };
  }, [talent.class, talent.spec, talent.hero_talent]);

  const slides = useMemo(
    () => (talent.screenshot ? [talent.screenshot] : []), // <- array attendu par la lightbox
    [talent.screenshot],
  );

  return (
    <Card className="!w-full hover:shadow-lg transition-shadow duration-300 relative h-full">
      {talent.info && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0 absolute top-2 right-2">
                <Info className="!h-5 !w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[100px]">{talent.info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <CardHeader className="flex flex-col items-center gap-4">
        {talent.screenshot && (
          <div
            className="relative h-30 w-30 cursor-pointer"
            onClick={openLightbox}
            aria-label="Voir la capture dans la lightbox"
          >
            <div className="h-30 w-30 rounded-full overflow-hidden shadow-lg">
              <Image
                src={talent.screenshot}
                alt={talent.name}
                fill
                sizes="96px"
                className={cn("object-cover object-center overflow-hidden rounded-full border-2", classColor)}
                // style={{ borderColor: classColor }}
              />
            </div>
            {heroTalentData?.icon_url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute bottom-0 right-0 h-12 w-12 rounded-full overflow-hidden border-5 z-10 border-card"
                      // style={{ borderColor: classColor }}
                    >
                      <Image
                        src={heroTalentData.icon_url}
                        alt={heroTalentData.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{heroTalentData.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        <YetAnotherLightBox
          open={lightboxOpen}
          close={closeLightbox}
          slides={slides}
          index={0}
          showArrows={false}
          showThumbnails={false}
        />

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-xl font-bold mb-3 line-clamp-2">{talent.name}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="shrink-0">
                  <Button variant="outline" size="icon" className="h-7 w-7 mb-3" onClick={copyToClipboard}>
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copié!" : "Copier le talent"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            {classData && (
              <div className="flex items-center gap-2 justify-center">
                {classData.icon_url && (
                  <div className="relative h-5 w-5 rounded-md overflow-hidden">
                    <Image src={classData.icon_url} alt={className} fill sizes="20px" className="object-cover" />
                  </div>
                )}
                <span>{className}</span>
              </div>
            )}
            {specData && (
              <div className="flex items-center gap-2 justify-center">
                {specData.icon_url && (
                  <div className="relative h-5 w-5 rounded-md overflow-hidden">
                    <Image src={specData.icon_url} alt={specName} fill sizes="20px" className="object-cover" />
                  </div>
                )}
                <span>{specName}</span>
              </div>
            )}
            {/* {heroTalentData && (
              <div className="flex items-center gap-2 justify-center">
                {heroTalentData.icon_url && (
                  <div className="relative h-5 w-5 rounded-md overflow-hidden">
                    <Image
                      src={heroTalentData.icon_url}
                      alt={heroTalentData.name}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{heroTalentData.name}</span>
              </div>
            )} */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="!p-0 w-full">
        <div className="flex flex-wrap gap-2 justify-center py-2 !px-0">
          {talent.dungeon_ids.map((dungeon) => (
            <Badge
              key={dungeon._id}
              variant="secondary"
              className="border-1 border-border px-2 flex items-center gap-2 py-1"
            >
              <div className="relative h-6 w-6 rounded-md overflow-hidden">
                <Image src={dungeon.icon_url} alt={dungeon.name} fill sizes="24px" className="object-cover" />
              </div>
              <span className="text-xs">{dungeon.short_name}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
      {/* 
        {specData?.icon_url && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="relative h-8 w-8 rounded-md overflow-hidden">
              <Image src={specData.icon_url} alt={specName} fill sizes="32px" className="object-cover" />
            </div>
            <span className="text-sm">{specRole}</span>
          </div>
        )}

        {heroTalentData && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium mb-2">Talent héroïque :</p>
            <div className="flex items-center justify-center gap-2">
              {heroTalentData.icon_url && (
                <div className="relative h-6 w-6 rounded-md overflow-hidden">
                  <Image
                    src={heroTalentData.icon_url}
                    alt={heroTalentData.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm">{heroTalentData.name}</span>
            </div>
          </div>
        )} */}
    </Card>
  );
}
