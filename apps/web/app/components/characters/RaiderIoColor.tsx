"use client";

import { useEffect, useState } from "react";

interface ScoreTier {
  score: number;
  rgbHex: string;
  rgbDecimal: number;
  rgbFloat: number[];
  rgbInteger: number[];
}

interface RaiderIoColorProps {
  score: number;
  children?: React.ReactNode;
  className?: string;
}

const RaiderIoColor: React.FC<RaiderIoColorProps> = ({ score, children, className = "" }) => {
  const [scoreTiers, setScoreTiers] = useState<ScoreTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScoreTiers = async () => {
      try {
        const response = await fetch("https://raider.io/api/v1/mythic-plus/score-tiers");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tiers de score");
        }
        const data: ScoreTier[] = await response.json();
        setScoreTiers(data);
      } catch (error) {
        console.error("Erreur lors du fetch des tiers de score:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScoreTiers();
  }, []);

  const getScoreColor = (score: number): string => {
    if (loading || scoreTiers.length === 0) {
      return "#666666"; // Couleur par défaut
    }

    // Trouver le tier approprié pour le score
    const appropriateTier = scoreTiers.find((tier) => score >= tier.score);

    if (appropriateTier) {
      return appropriateTier.rgbHex;
    }

    // Si aucun tier trouvé, retourner la couleur du tier le plus bas
    return scoreTiers[scoreTiers.length - 1]?.rgbHex || "#666666";
  };

  const color = getScoreColor(score);

  return (
    <span className={className} style={{ color }}>
      {children}
    </span>
  );
};

export default RaiderIoColor;
