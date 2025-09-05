"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetRealTimeDataQuery } from "@/redux/api/analytics.apiSlice";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/chart";
import { Activity, Clock, Eye, Globe, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface PageData {
  path: string;
  views: number;
}

interface SourceData {
  source: string;
  sessions: number;
}

interface RealTimeData {
  activeUsers: number;
  currentPages: PageData[];
  currentSources: SourceData[];
}

export default function RealTimeData() {
  const { data, isLoading, error } = useGetRealTimeDataQuery();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mise à jour automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const realTimeData = data?.data as unknown as RealTimeData;

  if (!realTimeData) return null;

  // Configuration des graphiques
  const pagesConfig = {
    views: {
      label: "Vues",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  const sourcesConfig = {
    sessions: {
      label: "Sessions",
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getActivityStatus = (activeUsers: number) => {
    if (activeUsers === 0) return { status: "Aucune activité", variant: "secondary" as const };
    if (activeUsers < 5) return { status: "Faible activité", variant: "outline" as const };
    if (activeUsers < 20) return { status: "Activité modérée", variant: "default" as const };
    return { status: "Forte activité", variant: "default" as const };
  };

  const activityStatus = getActivityStatus(realTimeData.activeUsers);

  return (
    <div className="space-y-6">
      {/* Métriques en temps réel */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{realTimeData.activeUsers}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>En temps réel</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dernière mise à jour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(lastUpdate)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Mise à jour automatique</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut d'activité</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={activityStatus.variant}>{activityStatus.status}</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {realTimeData.activeUsers} utilisateur{realTimeData.activeUsers > 1 ? "s" : ""} en ligne
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Données détaillées en temps réel */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pages actuelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Pages actuellement visitées</span>
            </CardTitle>
            <CardDescription>Pages vues en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            {realTimeData.currentPages.length > 0 ? (
              <div className="space-y-4">
                <ChartContainer config={pagesConfig} className="h-[200px] w-full">
                  <BarChart data={realTimeData.currentPages} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toString()}
                    />
                    <YAxis dataKey="path" type="category" tickLine={false} axisLine={false} width={200} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Vues actuelles"]}
                    />
                    <Bar dataKey="views" fill="var(--color-views)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Pages en cours</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {realTimeData.currentPages.slice(0, 5).map((page: PageData, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span className="text-sm font-medium truncate max-w-[200px]">{page.path}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">{page.views}</span>
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucune page visitée actuellement</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sources actuelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Sources actuelles</span>
            </CardTitle>
            <CardDescription>Sources de trafic en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            {realTimeData.currentSources.length > 0 ? (
              <div className="space-y-4">
                <ChartContainer config={sourcesConfig} className="h-[200px] w-full">
                  <BarChart data={realTimeData.currentSources} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toString()}
                    />
                    <YAxis dataKey="source" type="category" tickLine={false} axisLine={false} width={120} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Sessions actuelles"]}
                    />
                    <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Sources en cours</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {realTimeData.currentSources.slice(0, 5).map((source: SourceData, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span className="text-sm font-medium">{source.source}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">{source.sessions}</span>
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucune source de trafic actuellement</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Indicateur de statut en temps réel */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                Données mises à jour automatiquement toutes les 30 secondes
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              Temps réel
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
