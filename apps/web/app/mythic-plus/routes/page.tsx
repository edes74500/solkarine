import { RouteDisplay } from "@/app/mythic-plus/routes/components/RouteDiplay";
import { EmptyCard } from "@/components/errorCards/EmptyCard";
import { getRoutesWithPopulatedDungeon } from "@/lib/api/routes";

export default async function RoutesPage() {
  const routes = await getRoutesWithPopulatedDungeon();

  return (
    <div className="dashboard-section">
      <h1>Routes</h1>
      <p>Retrouvez ici mes routes de mythic+</p>
      {routes.data.length > 0 ? <RouteDisplay /> : <EmptyCard />}
    </div>
  );
}
