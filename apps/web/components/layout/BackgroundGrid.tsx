"use client";

import { usePathname } from "next/navigation";

export default function BackgroundGrid() {
  const pathname = usePathname();
  // Ne pas afficher la grille dans les pages admin
  if (pathname?.includes("admin")) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 opacity-[0.025] dark:opacity-[0.01] light:opacity-[0.01] h-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px) ",
        backgroundSize: "40px 40px",
      }}
    ></div>
  );
}
