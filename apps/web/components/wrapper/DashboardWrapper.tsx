"use client";

import { useIsDesktop } from "@/hooks/useMediaQuery";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-6 mx-auto w-full px-4 md:w-2/3 h-screen justify-center items-center text-center">
        <div className="flex items-center justify-center rounded-full bg-amber-100 p-4 w-16 h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Accès limité</h2>
        <p className="text-gray-600">
          Le dashboard est disponible uniquement sur desktop. Veuillez utiliser un appareil avec un écran plus large.
        </p>
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>Ordinateur recommandé</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
