"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const consent = localStorage.getItem("analytics_consent");

    // Vérifie si l'utilisateur a donné son consentement
    // if (consent !== "true") {
    //   console.warn("Analytics désactivé en raison du refus ou de l'absence de consentement.");
    //   return;
    // }

    const url = `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;

    // console.log("Tracking page view:", url);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-CKGT6GFXGF", { page_path: url });
      // console.log("gtag config sent for URL:", url);
    } else {
      console.warn("gtag not initialized or window.gtag is undefined");
    }
  }, [pathname, searchParams]);

  return null;
};

export default Analytics;
