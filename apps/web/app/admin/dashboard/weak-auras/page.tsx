"use client";

import { useGetAllWeakAurasQuery } from "@/redux/api/weakAuras.apiSlice";
import { useState } from "react";
import { AddWeakAuraForm, ErrorCard, InfoAlert, LoadingSpinner, SuccessCard, WeakAuraList } from "./components";

export default function WeakAurasPage() {
  const [successData, setSuccessData] = useState<any>(null);
  const { data: weakAuras, isLoading: isLoadingWeakAuras, error: errorWeakAuras } = useGetAllWeakAurasQuery();

  const handleAddSuccess = (data: any) => {
    setSuccessData(data);
  };

  const handleDeleteWeakAura = (id: string) => {
    console.log(`Suppression de la WeakAura avec l'ID: ${id}`);
    // Ici on pourrait ajouter un appel API pour supprimer la WeakAura
    // Pour l'instant, c'est juste un console.log comme demandé
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">WeakAuras</h1>

      <InfoAlert />

      <AddWeakAuraForm onSuccess={handleAddSuccess} />

      {successData && <SuccessCard data={successData} />}

      {isLoadingWeakAuras && <LoadingSpinner />}

      {errorWeakAuras && <ErrorCard message="Erreur lors du chargement des WeakAuras" />}

      {weakAuras && <WeakAuraList weakAuras={weakAuras} onDelete={handleDeleteWeakAura} />}
    </div>
  );
}
