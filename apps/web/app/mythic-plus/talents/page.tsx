import TalentsList from "@/app/mythic-plus/talents/components/TalentsList";
import { getAllTalentsWithPopulatedDungeon } from "@/lib/api/talents";

export default async function TalentsPage() {
  const talents = await getAllTalentsWithPopulatedDungeon();

  return (
    <div className="dashboard-section">
      <h1 className="">Mes Talents</h1>
      <TalentsList talents={talents.data} />
    </div>
  );
}
