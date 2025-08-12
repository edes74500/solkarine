import AddonProfileList from "@/app/interface/addons-profiles/components/AddonProfileList";
import { EmptyCard } from "@/components/statusCard/EmptyCard";
import { getAllAddonProfilesWithPopulatedAddon } from "@/lib/api/addonProfile";

export default async function AddonProfilesPage() {
  const addonProfiles = await getAllAddonProfilesWithPopulatedAddon();

  console.log(addonProfiles);

  return (
    <section className="dashboard-section">
      <h1>Profils d'addons</h1>

      {addonProfiles.data.length === 0 ? <EmptyCard /> : <AddonProfileList addonProfiles={addonProfiles.data} />}
      {/* <AddonProfilesList addonProfiles={addonProfiles.data} /> */}
    </section>
  );
}
