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

const RaiderIoCardHome: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const classColor = getClassColor(data.class);

  return (
    <Card
      className="overflow-hidden w-full  mx-auto bg-gradient-to-br from-[#070a3b]  to-[#f8b195] dark:bg-slate-800 dark:bg-gradient-to-br dark:from-[#070a3b] dark:to-[#3d1e0b] relative shadow-lg"
      // style={{ boxShadow: `0 4px 12px black` }}
    >
      {/* Effets de fond subtils */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${classColor} 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full opacity-5"
          style={{ background: `radial-gradient(circle, ${classColor} 0%, transparent 70%)` }}
        /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent opacity-30" />
      </div>

      <CardHeader className="!mb-0 !pb-0 !text-white dark:!text-white !h-fit py-3 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {data.thumbnail_url && (
            <Avatar className={`h-16 w-16 border-3 shrink-0`} style={{ borderColor: classColor }}>
              <AvatarImage src={data.thumbnail_url || ""} alt={data.name} className="object-cover" />
            </Avatar>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div>
              <h3 className="text-xl font-bold line-clamp-1">
                <a
                  href={data.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: classColor }}
                >
                  {data.name}
                </a>
              </h3>
              <div className="text-xs md:text-sm space-y-1">
                <p className="line-clamp-1 text-gray-200">
                  {data.active_spec_name} {data.class} - {data.realm} ({data.region.toUpperCase()})
                </p>
                <p className="font-medium">{Math.floor(data.gear?.item_level_equipped)} ilvl</p>
              </div>
            </div>
            {data.mythic_plus_scores_by_season[0]?.scores?.all !== 0 && (
              <div className="hidden sm:flex items-center">
                <div
                  className="rounded-md px-3 py-2 text-white font-bold"
                  style={{
                    background: `linear-gradient(to bottom right, ${data.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#2a6ca8"}CC, ${data.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#2a6ca8"}77)`,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 15px ${data.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#2a6ca8"}80, inset 0 0 20px ${data.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#2a6ca8"}30`,
                    border: `1px solid ${data.mythic_plus_scores_by_season[0]?.segments?.all?.color || "#2a6ca8"}`,
                  }}
                >
                  <p className="text-xs uppercase mb-1">Score M+</p>
                  <p className="text-xl">{data.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-4 relative z-10">
        <div
          className="sm:hidden rounded-md px-3 py-2 text-white font-bold"
          style={{
            backgroundColor: data.mythic_plus_scores_by_season[0]?.segments?.all?.color,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <p className="text-xs uppercase mb-1">Score Mythic+</p>
          <p className="text-xl">{data.mythic_plus_scores_by_season[0]?.scores?.all.toFixed(1)}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
          {data.mythic_plus_best_runs?.map((run) => (
            <div
              key={run.keystone_run_id}
              className="relative overflow-hidden rounded-md h-12 group cursor-pointer transition-transform hover:scale-[1.02]"
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
              <div className="relative z-10 p-2 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-white drop-shadow-md line-clamp-1 font-medium">
                    {run.dungeon}
                  </span>
                  <Badge
                    className={cn(
                      "text-white text-xs px-1.5 py-0.5",
                      run.num_keystone_upgrades > 0 ? "bg-green-600" : "bg-red-500",
                    )}
                  >
                    {run.mythic_level}
                    <sup className="text-[6px] md:text-[8px] ml-0.5">
                      {Array(run.num_keystone_upgrades).fill("⭐").join("")}
                    </sup>
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

export default RaiderIoCardHome;
