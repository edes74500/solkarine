import TalentsCard from "@/components/cards/TalentsCard";
import { EmptyCard } from "@/components/statusCard/EmptyCard";
import { getAllTalentsWithPopulatedDungeon } from "@/lib/api/talents";

export default async function TalentsPage() {
  const talents = await getAllTalentsWithPopulatedDungeon();

  return (
    <div className="dashboard-section">
      <h1 className="">Mes Talents</h1>
      {talents?.data.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {talents?.data.map((talent) => (
            <TalentsCard key={talent._id} talent={talent} />
          ))}
        </div>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
}
