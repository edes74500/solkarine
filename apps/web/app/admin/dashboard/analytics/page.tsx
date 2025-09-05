import AcquisitionData from "@/app/admin/dashboard/analytics/components/AcquisitionData";
import BehaviorData from "@/app/admin/dashboard/analytics/components/BehaviorData";
import LastSevenDays from "@/app/admin/dashboard/analytics/components/LastSevenDays";
import TechData from "@/app/admin/dashboard/analytics/components/TechData";
import TrafficOverview from "@/app/admin/dashboard/analytics/components/TrafficOverview";

export default function AnalyticsPage() {
  return (
    <section className="dashboard-section space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Tableau de bord complet des analyses et métriques de votre application</p>
      </div>

      {/* Vue d'ensemble du trafic */}
      <TrafficOverview />

      {/* Données en temps réel inutile pour le moment */}
      {/* <RealTimeData /> */}

      {/* Graphique des 7 derniers jours */}
      <LastSevenDays />

      {/* Données d'acquisition */}
      <AcquisitionData />

      {/* Comportement des utilisateurs */}
      <BehaviorData />

      {/* Données de conversion inutile pour le moment */}
      {/* <ConversionsData /> */}

      {/* Données techniques */}
      <TechData />
    </section>
  );
}
