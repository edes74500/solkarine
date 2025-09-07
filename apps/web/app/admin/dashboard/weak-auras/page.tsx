"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetAllWeakAurasQuery } from "@/redux/api/weakAuras.apiSlice";
import { useState } from "react";
import { AddWeakAuraDialog, InfoAlert, WeakAuraList } from "./components";

export default function WeakAurasPage() {
  const [successData, setSuccessData] = useState<any>(null);
  const {
    data: weakAuras,
    isLoading: isLoadingWeakAuras,
    error: errorWeakAuras,
    isFetching,
  } = useGetAllWeakAurasQuery();

  const handleAddSuccess = (data: any) => {
    setSuccessData(data);
  };

  const handleDeleteWeakAura = (id: string) => {
    console.log(`Suppression de la WeakAura avec l'ID: ${id}`);
    // Ici on pourrait ajouter un appel API pour supprimer la WeakAura
    // Pour l'instant, c'est juste un console.log comme demandé
  };

  return (
    <section className="dashboard-section">
      <div className="flex justify-between items-center">
        <h1>WeakAuras</h1>
      </div>

      <InfoAlert />
      <AddWeakAuraDialog onSuccess={handleAddSuccess} />

      {/* {successData && <SuccessCard data={successData} />} */}

      {(isLoadingWeakAuras || isFetching) && <LoadingCard />}

      {errorWeakAuras && <ErrorCard message="Erreur lors du chargement des WeakAuras" />}

      {weakAuras && <WeakAuraList weakAuras={weakAuras.data} onDelete={handleDeleteWeakAura} />}
    </section>
  );
}
