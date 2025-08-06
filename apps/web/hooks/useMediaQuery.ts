"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Vérifier si window est disponible (côté client)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Définir l'état initial
      setMatches(media.matches);

      // Fonction de mise à jour lors des changements
      const listener = () => setMatches(media.matches);

      // Ajouter l'écouteur d'événement
      media.addEventListener("change", listener);

      // Nettoyer l'écouteur lors du démontage
      return () => media.removeEventListener("change", listener);
    }

    return undefined;
  }, [query]);

  return matches;
}

// Breakpoints prédefinis pour Tailwind
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

// Hooks personnalisés pour chaque breakpoint
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
