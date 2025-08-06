"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAddonCountQuery } from "@/redux/api/addon.apiSlice";
import { useGetWeakAuraCountQuery } from "@/redux/api/weakAuras.apiSlice";
import { BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export function StatisticDash() {
  const { data: weakAuraCount } = useGetWeakAuraCountQuery();
  const { data: addonCount } = useGetAddonCountQuery();
  const router = useRouter();

  return (
    <div>
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Statistiques rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="text-center p-4 bg-background rounded-lg cursor-pointer"
              onClick={() => router.push("/admin/dashboard/characters")}
            >
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Personnages enregistrés</div>
            </div>
            <div
              className="text-center p-4 bg-background rounded-lg cursor-pointer"
              onClick={() => router.push("/admin/dashboard/addons")}
            >
              <div className="text-2xl font-bold text-primary">{addonCount?.data || 0}</div>
              <div className="text-sm text-muted-foreground">Addons disponibles</div>
            </div>
            <div
              className="text-center p-4 bg-background rounded-lg cursor-pointer"
              onClick={() => router.push("/admin/dashboard/weak-auras")}
            >
              <div className="text-2xl font-bold text-primary">{weakAuraCount?.data || 0}</div>
              <div className="text-sm text-muted-foreground">WeakAuras disponibles</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
