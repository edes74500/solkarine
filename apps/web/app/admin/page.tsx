"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-4">Redirection vers le tableau de bord...</p>
    </div>
  );
}
