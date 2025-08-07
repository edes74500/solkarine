import { useEffect, useState } from "react";

interface UsePasteZoneReturn {
  isPasteActive: boolean;
  setIsPasteActive: (active: boolean) => void;
}

export function usePasteZone(): UsePasteZoneReturn {
  const [isPasteActive, setIsPasteActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPasteActive) {
        setIsPasteActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPasteActive]);

  return {
    isPasteActive,
    setIsPasteActive,
  };
}
