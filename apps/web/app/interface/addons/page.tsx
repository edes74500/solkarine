import { AddonList } from "@/app/interface/addons/components/AddonList";
import { EmptyCard } from "@/components/statusCard/EmptyCard";
import { getAllAddons } from "@/lib/api/addon";

export default async function AddonsPage() {
  const addons = await getAllAddons();

  return (
    <section className="dashboard-section">
      <h1>Mes addons</h1>
      {addons.data.length > 0 ? <AddonList addons={addons.data} /> : <EmptyCard />}
    </section>
  );
}
