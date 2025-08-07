import { RouteCardTwo } from "@/components/routes/RouteCardTwo";
import { getRoutesWithPopulatedDungeon } from "@/lib/api/routes";

export async function RouteDisplay() {
  const routes = await getRoutesWithPopulatedDungeon();
  return (
    <div className="flex flex-col max-w-2xl gap-4">
      {routes.data.map((route) => (
        <RouteCardTwo key={route.id} route={route} />
      ))}
    </div>
  );
}
