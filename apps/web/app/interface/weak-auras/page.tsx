import { WeakAuraList } from "@/app/interface/weak-auras/components/WeakAuraList";
import { EmptyCard } from "@/components/statusCard/EmptyCard";
import { getAllWeakAura } from "@/lib/api/weakaura";

export const dynamic = "force-static";
// export const cache = "force-cache";

export default async function WeakAurasPage() {
  const weakAuras = await getAllWeakAura();
  return (
    <section className="dashboard-section">
      <h1>Mes Weak-Aura</h1>
      {weakAuras.data.length > 0 ? <WeakAuraList weakAuras={weakAuras.data} /> : <EmptyCard />}
    </section>
  );
}
