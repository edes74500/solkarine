"use client";

import { cn } from "@/lib/utils";
import { WEAK_AURA_IMAGE_SOURCE, WEAK_AURA_TAGS } from "@repo/constants";
import { WeakAuraClient } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface WeakAuraFilterProps {
  weakAuras: WeakAuraClient[];
  onFilterChange: (filteredWeakAuras: WeakAuraClient[]) => void;
}

export function WeakAuraFilter({ weakAuras, onFilterChange }: WeakAuraFilterProps) {
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const filteredWeakAuras = tagFilter
    ? weakAuras.filter((weakAura) => weakAura.tags?.includes(tagFilter as (typeof WEAK_AURA_TAGS)[number]))
    : weakAuras;

  // Notifier le parent des changements de filtre
  useEffect(() => {
    onFilterChange(filteredWeakAuras);
  }, [tagFilter, weakAuras, onFilterChange]);

  const handleTagFilter = (tag: string | null) => {
    setTagFilter(tag);
    const newFilteredWeakAuras = tag
      ? weakAuras.filter((weakAura) => weakAura.tags?.includes(tag as (typeof WEAK_AURA_TAGS)[number]))
      : weakAuras;
    onFilterChange(newFilteredWeakAuras);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {WEAK_AURA_TAGS.map((tag) => {
        const tagCount = weakAuras.filter((weakAura) => weakAura.tags?.includes(tag)).length;
        if (tagCount === 0) return null;

        return (
          <Badge
            key={tag}
            variant={tagFilter === tag ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all",
              tagFilter === tag ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary",
            )}
            onClick={() => handleTagFilter(tag === tagFilter ? null : tag)}
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
            <div className="uppercase flex items-center gap-2">
              {tag.replace("_", " ")}{" "}
              <span
                className={`text-xs ml-2 ${tagFilter !== tag ? (tagCount > 0 ? "text-foreground font-bold" : "text-muted-foreground") : ""}`}
              >
                <span className={tagFilter === tag ? "text-primary-foreground" : ""}>{tagCount}</span>
              </span>
            </div>
            {tagFilter === tag ? (
              <X
                className="h-3.5 w-3.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagFilter(null);
                }}
              />
            ) : (
              <></>
            )}
          </Badge>
        );
      })}
    </div>
  );
}
