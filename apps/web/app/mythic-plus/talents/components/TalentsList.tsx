"use client";

import TalentsCard from "@/components/cards/TalentsCard";
import { TalentsFilter } from "@/components/filters/TalentsFilter";
import { TalentClientWithDungeonPopulated } from "@repo/types";
import { useState } from "react";

export default function TalentsList({ talents }: { talents: TalentClientWithDungeonPopulated[] }) {
  const [filteredTalents, setFilteredTalents] = useState<TalentClientWithDungeonPopulated[]>(talents);

  return (
    <>
      <TalentsFilter talents={talents} onFilterChange={setFilteredTalents} />

      {filteredTalents.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {filteredTalents.map((talent) => (
            <TalentsCard key={talent._id} talent={talent} />
          ))}
        </div>
      )}
    </>
  );
}
