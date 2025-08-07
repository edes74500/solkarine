import AddRouteDialog from "@/app/admin/dashboard/routes/components/AddRouteDialog";
import RoutesList from "@/app/admin/dashboard/routes/components/RoutesList";

export default function Routes() {
  return (
    <section className="dashboard-section">
      <h1 className="text-3xl font-bold">Routes</h1>
      <AddRouteDialog />
      <RoutesList />
    </section>
  );
}
