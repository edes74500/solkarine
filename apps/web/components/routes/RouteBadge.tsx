"use client";

import { cn } from "@/lib/utils";
import { RouteDBWithDungeonPopulated } from "@repo/types/dist";
import { Badge } from "@repo/ui/components/badge";
import Image from "next/image";

interface RouteBadgeProps {
  dungeon: RouteDBWithDungeonPopulated["dungeon_id"];
  setSelectedDungeon: (dungeon: string | null) => void;
  selectedDungeon: string | null;
  routes: RouteDBWithDungeonPopulated[];
  showFullName?: boolean;
}

export function RouteBadge({
  dungeon,
  selectedDungeon,
  routes,
  setSelectedDungeon,
  showFullName = false,
}: RouteBadgeProps) {
  const isSelected = selectedDungeon === dungeon._id;
  const routeCount = routes.filter((route) => route.dungeon_id._id === dungeon._id).length;

  const handleClick = () => {
    setSelectedDungeon(isSelected ? null : dungeon._id);
  };

  return (
    <Badge
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "cursor-pointer px-4 flex items-center gap-2 text-sm font-medium rounded-md transition-all h-14 border-2 border-none w-full shadow-md md:w-[250px] md:max-w-[250px]",
        isSelected
          ? "bg-primary text-primary-foreground shadow-md border-primary ring-2 ring-primary"
          : "hover:bg-secondary",
        "relative overflow-hidden",
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 h-full">
          <Image
            src={dungeon.background_image_url}
            alt={dungeon.short_name}
            fill
            className="object-cover"
            style={{ filter: "brightness(1.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/20 to-card/10 w-full h-full"></div>
        </div>
        {/* <div className="absolute inset-0 right-1/2 w-1/2 h-full bg-card"></div> */}
      </div>
      <div className="flex items-center justify-between w-full relative ">
        <div></div>
        <div className="uppercase text-white font-extrabold truncate bg-black/60 bg-blur-md px-10 rounded-md">
          {showFullName ? dungeon.name : dungeon.short_name}
        </div>
        <div
          className={`text-xs ml-2 shrink-0 text-white bg-black/60 shrink-0 bg-blur-md p-1 rounded-full aspect-square w-6 h-6 flex items-center justify-center`}
        >
          {routeCount}
        </div>
      </div>
      {/* {isSelected ? (
        <X
          className="h-3.5 w-3.5 cursor-pointer relative z-10 text-white"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDungeon(null);
          }}
        />
      ) : (
        <></>
      )} */}
    </Badge>
  );
}
