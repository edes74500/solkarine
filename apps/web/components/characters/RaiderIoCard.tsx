// components/RaiderIoCard.tsx

"use client";

import { getClassColor } from "@/utils/classColor";
import { RaiderioCharacter } from "@repo/types/dist";
import { Avatar, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  data: RaiderioCharacter | null;
}

const RaiderIoCard: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="overflow-hidden max-w-sm dark:bg-stone-800bg-stone-600 drop-shadow-md">
      <CardHeader className="!mb-0 !pb-0 !text-white !h-fit">
        <div className="flex items-center gap-2">
          {data.thumbnail_url && (
            <Avatar className="h-16 w-16 border-2 border-primary/50">
              <AvatarImage src={data.thumbnail_url || ""} alt={data.name} className="object-cover" />
            </Avatar>
          )}
          <div className="flex- flex-col w-full">
            <h3 className="text-xl font-bold line-clamp-1">
              <a
                href={data.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  color: getClassColor(data.class),
                  // textShadow: "0px 0px 3px rgba(0, 0, 0, 0.8), 0px 0px 1px #000",
                  // WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.5)",
                  // filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.7))",
                }}
              >
                {data.name}
              </a>
            </h3>
            <div className="text-sm ">
              <p className="line-clamp-2 text-xs">
                {data.active_spec_name} {data.class} - {data.realm} ({data.region.toUpperCase()})
              </p>
              <p className="font-bold">{Math.floor(data.gear?.item_level_equipped)} ilvl</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className=" pt-0 space-y-4">
        <div className="bg-stone-700 dark:bg-card/50 text-white p-3 rounded-md">
          <p className="text-sm ">Score Mythic+</p>
          <p
            className="text-xl font-bold"
            style={{
              color: data.mythic_plus_scores_by_season[0]?.segments?.all?.color,
              // textShadow: "0px 0px 3px rgba(0, 0, 0, 0.8), 0px 0px 1px #000",
              // WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.5)",
              // filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.7))",
            }}
          >
            {data.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {data.mythic_plus_best_runs?.map((run) => (
            <div
              key={run.keystone_run_id}
              className="relative overflow-hidden rounded-md h-12 group cursor-pointer"
              onClick={() => {
                window.open(run.url, "_blank");
              }}
            >
              {run.background_image_url && (
                <div className="absolute inset-0">
                  <Image src={run.background_image_url} alt={run.dungeon} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              )}
              <div className="relative z-10 p-3 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white drop-shadow-md line-clamp-1">{run.dungeon}</span>
                  <Badge className={cn("text-white", run.num_keystone_upgrades > 0 ? "bg-green-600" : "bg-red-500")}>
                    {run.mythic_level}
                    <sup className="text-[7px] ml-0.5">{Array(run.num_keystone_upgrades).fill("⭐").join("")}</sup>
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RaiderIoCard;
