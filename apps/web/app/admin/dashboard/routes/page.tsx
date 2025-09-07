import AddRouteDialog from "@/app/admin/dashboard/routes/components/AddRouteDialog";
import RoutesList from "@/app/admin/dashboard/routes/components/RoutesList";

export default function Routes() {
  return (
    <section className="dashboard-section">
      <h1>Routes</h1>
      <AddRouteDialog mode="create" />
      <RoutesList />
    </section>
  );
}
