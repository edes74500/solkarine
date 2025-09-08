"use client";

import { cn } from "@/lib/utils";
import { CLASS_AND_TALENTS, CLASS_COLORS } from "@repo/constants";
import { TalentClientWithDungeonPopulated } from "@repo/types/dist";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface TalentsFilterProps {
  talents: TalentClientWithDungeonPopulated[]; // Remplacer par le type approprié
  onFilterChange: (filteredTalents: any[]) => void; // Remplacer par le type approprié
}

export function TalentsFilter({ talents, onFilterChange }: TalentsFilterProps) {
  const [classFilter, setClassFilter] = useState<number | null>(null);

  // Notifier le parent des changements de filtre

  const handleClassFilter = (classIndex: number | null) => {
    setClassFilter(classIndex);
    const newFilteredTalents = classIndex !== null ? talents.filter((talent) => talent.class === classIndex) : talents;
    onFilterChange(newFilteredTalents);
  };

  // Extraire toutes les classes disponibles de CLASS_AND_TALENTS
  const availableClasses = Object.entries(CLASS_AND_TALENTS).map(([index, classData]) => ({
    index: Number(index),
    name: classData.name,
    icon_url: classData.icon_url,
    color: CLASS_COLORS[classData.name as keyof typeof CLASS_COLORS],
  }));

  return (
    <div className="flex flex-wrap gap-2">
      {availableClasses.map((classInfo) => {
        const classCount = talents.filter((talent) => talent.class === classInfo.index).length;
        if (classCount === 0) return null;

        return (
          <Badge
            key={classInfo.name}
            variant={classFilter === classInfo.index ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all",
              classFilter === classInfo.index ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary",
              classFilter === classInfo.index ? `border-[${classInfo.color}]` : "",
            )}
            onClick={() => handleClassFilter(classFilter === classInfo.index ? null : classInfo.index)}
          >
            <Avatar>
              <AvatarImage
                src={classInfo.icon_url}
                className="object-cover scale-110 transition-transform duration-300"
              />
              <AvatarFallback>
                <span className="uppercase">{classInfo.name.charAt(0)}</span>
              </AvatarFallback>
            </Avatar>
            <div className="uppercase flex items-center gap-2">
              {classInfo.name}{" "}
              <span
                className={`text-xs ml-2 ${classFilter !== classInfo.index ? (classCount > 0 ? "text-foreground font-bold" : "text-muted-foreground") : ""}`}
              >
                <span className={classFilter === classInfo.index ? "text-primary-foreground" : ""}>{classCount}</span>
              </span>
            </div>
            {classFilter === classInfo.index ? (
              <X
                className="h-3.5 w-3.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClassFilter(null);
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
