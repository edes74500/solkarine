"use client";

import { AddAddonSection } from "@/app/admin/dashboard/addons/components/AddAddonSection";
import { AddonList } from "@/app/admin/dashboard/addons/components/AddonList";

export default function AddonPage() {
  return (
    <section className="dashboard-section">
      <h1>Gestion des addons</h1>
      <AddAddonSection />
      <AddonList />
    </section>
  );
}
