import { RouteDisplay } from "@/app/mythic-plus/routes/components/RouteList";
import { EmptyCard } from "@/components/errorCards/EmptyCard";
import { getRoutesWithPopulatedDungeon } from "@/lib/api/routes";

export default async function RoutesPage() {
  const routes = await getRoutesWithPopulatedDungeon();

  return (
    <div className="dashboard-section">
      <h1 className="font-dyna-puff">Mes Routes</h1>
      {/* <p>Retrouvez ici mes routes de mythic+</p> */}
      {routes.data.length > 0 ? <RouteDisplay routes={routes.data} /> : <EmptyCard />}
    </div>
  );
}
