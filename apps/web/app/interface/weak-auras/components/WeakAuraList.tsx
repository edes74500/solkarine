"use client";

import { WeakAuraCard } from "@/app/interface/weak-auras/components/WeakAuraCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WEAK_AURA_IMAGE_SOURCE, WEAK_AURA_TAGS } from "@repo/constants";
import { WeakAuraClient } from "@repo/types/dist";
import { X } from "lucide-react";
import { useState } from "react";

interface WeakAuraListProps {
  weakAuras: WeakAuraClient[];
}

export function WeakAuraList({ weakAuras }: WeakAuraListProps) {
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const filteredWeakAuras = tagFilter
    ? weakAuras.filter((weakAura) => weakAura.tags?.includes(tagFilter as (typeof WEAK_AURA_TAGS)[number]))
    : weakAuras;

  return (
    <div className="flex flex-col gap-4 space-y-10">
      <div className="flex flex-wrap gap-2  rounded-lg shadow-sm">
        {/* <Badge
          key="all"
          variant={tagFilter === null ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-4 py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all",
            tagFilter === null ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary",
          )}
          onClick={() => setTagFilter(null)}
        >
          <span className="uppercase">TOUS</span>
          <Filter className="h-4 w-4" />
        </Badge> */}

        {WEAK_AURA_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={tagFilter === tag ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all",
              tagFilter === tag ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary",
            )}
            onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
          >
            <Avatar>
              <AvatarImage
                src={WEAK_AURA_IMAGE_SOURCE[tag as keyof typeof WEAK_AURA_IMAGE_SOURCE]}
                className="object-cover scale-110 transition-transform duration-300"
              />
              <AvatarFallback>
                <span className="uppercase">{tag.replace("_", " ")}</span>
              </AvatarFallback>
            </Avatar>
            <span className="uppercase">{tag.replace("_", " ")}</span>
            {tagFilter === tag ? (
              <X
                className="h-3.5 w-3.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setTagFilter(null);
                }}
              />
            ) : (
              <></>
            )}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {filteredWeakAuras
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((weakAura) => (
            <WeakAuraCard key={weakAura.id} weakAura={weakAura} />
          ))}
      </div>
    </div>
  );
}
