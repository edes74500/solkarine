import { AddonList } from "@/app/interface/addons/components/AddonList";
import { getAllAddons } from "@/lib/api/addon";

export default async function AddonsPage() {
  const addons = await getAllAddons();
  return (
    <section className="dashboard-section">
      <h1>Mes addons</h1>
      <p>Retrouvez ici ma collection d'addons</p>
      <AddonList addons={addons.data} />
    </section>
  );
}
