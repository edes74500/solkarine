"use client";

import AddTalent from "@/app/admin/dashboard/talents/components/AddTalent";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";

export default function TalentsList() {
  const { data: dungeons, isLoading: isLoadingDungeons } = useGetDungeonsQuery();
  return (
    <div>
      <AddTalent dungeons={dungeons?.data || []} isDungeonsLoading={isLoadingDungeons} />
    </div>
  );
}
