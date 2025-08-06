import { AddonCard } from "@/components/addons/addoncard";
import { AddonClient } from "@repo/types/dist";

interface AddonListProps {
  addons: AddonClient[];
}

export function AddonList({ addons }: AddonListProps) {
  return (
    <div className="flex flex-col gap-4">
      {addons.map((addon) => (
        <div key={addon.id}>
          <AddonCard addon={addon} />
        </div>
      ))}
    </div>
  );
}
