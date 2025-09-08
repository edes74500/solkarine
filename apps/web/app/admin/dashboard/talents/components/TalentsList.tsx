"use client";

import AddTalent from "@/app/admin/dashboard/talents/components/AddTalent";
import EditTalent from "@/app/admin/dashboard/talents/components/EditTalent";
import { useTalentDeleteSubmit } from "@/app/admin/dashboard/talents/hooks/useTalentSubmit";
import TalentsCard from "@/components/cards/TalentsCard";
import { TalentsFilter } from "@/components/filters/TalentsFilter";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { useGetAllTalentsWithPopulatedDungeonQuery } from "@/redux/api/talents.apiSlice";
import { TalentClientWithDungeonPopulated } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TalentsList() {
  const { data: dungeons, isLoading: isLoadingDungeons } = useGetDungeonsQuery();
  const { data: talents, isLoading: isLoadingTalents } = useGetAllTalentsWithPopulatedDungeonQuery();
  const [filteredTalents, setFilteredTalents] = useState<TalentClientWithDungeonPopulated[]>(talents?.data || []);
  const { onSubmitAction } = useTalentDeleteSubmit();

  useEffect(() => {
    setFilteredTalents(talents?.data || []);
  }, [talents]);

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-2xl font-semibold">Mes talents</h3>

      <AddTalent dungeons={dungeons?.data || []} isDungeonsLoading={isLoadingDungeons} />

      <TalentsFilter talents={talents?.data || []} onFilterChange={setFilteredTalents} />
      <div className="flex flex-wrap gap-4">
        {filteredTalents?.map((talent) => (
          <div key={talent._id} className="relative !w-2xs min-h-40 !min-w-2xs !max-w-2xs">
            <TalentsCard talent={talent} />
            <div className="absolute top-2 -right-4 flex flex-col gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onSubmitAction(talent._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <EditTalent talent={talent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
