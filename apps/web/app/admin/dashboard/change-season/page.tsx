"use client";

import { usePostChangeSeasonMutation } from "@/redux/api/changeSeason.ApiSlice";
import { Season } from "@repo/types";
import { useRef, useState } from "react";
import { ChangeSeasonDialog, ExpansionSelector, SeasonDetails, SeasonList, WarningAlert } from "./components";

export default function ChangeSeason() {
  const [currentExpansions, setCurrentExpansions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [staticData, setStaticData] = useState<Season[] | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedSeasonData, setSelectedSeasonData] = useState<Season | null>(null);
  const [postChangeSeason, { isLoading: isPosting }] = usePostChangeSeasonMutation();
  const selectedRef = useRef<HTMLDivElement>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://raider.io/api/v1/mythic-plus/static-data?expansion_id=${currentExpansions}`,
      );
      const data = await response.json();
      // Vérifier si data.seasons existe avant d'appliquer filter
      const filteredData = data.seasons.filter(
        (season: Season) => season.is_main_season && !season.name.toLowerCase().includes("post"),
      );
      console.log("Données récupérées:", filteredData);
      setStaticData(filteredData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSeason = (season: Season) => {
    setSelectedSeason(season);
    setSelectedSeasonData(season);
    setTimeout(() => {
      selectedRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePostChangeSeason = async () => {
    try {
      await postChangeSeason(selectedSeasonData as Season);
      setShowConfirmation(false);
      setSelectedSeason(null);
      setSelectedSeasonData(null);
    } catch (error) {
      console.error("Erreur lors de la modification de la saison:", error);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Changer de saison</h1>
        <WarningAlert />
        <ExpansionSelector
          currentExpansion={currentExpansions}
          onExpansionChange={setCurrentExpansions}
          onFetchData={handleFetchData}
          isLoading={isLoading}
        />
      </section>

      {staticData && <SeasonList seasons={staticData} onSelectSeason={handleSelectSeason} />}

      {selectedSeason && (
        <div ref={selectedRef}>
          <SeasonDetails
            season={selectedSeason}
            onClose={() => setSelectedSeason(null)}
            onConfirm={() => setShowConfirmation(true)}
            isLoading={isPosting}
          />
        </div>
      )}

      <ChangeSeasonDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handlePostChangeSeason}
        selectedSeason={selectedSeason}
        isLoading={isPosting}
      />
    </>
  );
}
