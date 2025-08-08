import { EmptyCard } from "@/components/statusCard/EmptyCard";

export default function AddonProfilesPage() {
  return (
    <section className="dashboard-section">
      <h1>Profils d'addons</h1>
      <p>Retrouvez ici ma collection de profils d'addons</p>
      <EmptyCard />
      {/* <AddonProfilesList addonProfiles={addonProfiles.data} /> */}
    </section>
  );
}
