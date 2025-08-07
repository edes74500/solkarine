import { WeakAuraList } from "@/app/interface/weak-auras/components/WeakAuraList";
import { EmptyCard } from "@/components/errorCards/EmptyCard";
import { getAllWeakAura } from "@/lib/api/weakaura";

export const dynamic = "force-static";
// export const cache = "force-cache";

export default async function WeakAurasPage() {
  const weakAuras = await getAllWeakAura();
  return (
    <section className="dashboard-section">
      <h1>Mes Weak-Aura</h1>
      <p>Retrouvez ici ma collection de Weak-Aura</p>
      {weakAuras.data.length > 0 ? <WeakAuraList weakAuras={weakAuras.data} /> : <EmptyCard />}
    </section>
  );
}
