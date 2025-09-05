"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetTrafficOverviewQuery } from "@/redux/api/analytics.apiSlice";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Clock, MousePointer, TrendingDown, TrendingUp, UserPlus, Users } from "lucide-react";

export default function TrafficOverview() {
  const { data, isLoading, error } = useGetTrafficOverviewQuery();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const metrics = data?.data;
  const period = data?.period;

  if (!metrics || !period) return null;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (value: number, isPositive: boolean) => {
    // Pour les métriques où une augmentation est positive (utilisateurs, sessions, etc.)
    if (isPositive) {
      return value > 0 ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      );
    }
    // Pour les métriques où une diminution est positive (taux de rebond)
    return value < 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const renderMetricCard = (
    title: string,
    value: number | string,
    changePct: number,
    icon: React.ReactNode,
    isPositiveTrend: boolean = true,
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <p className="text-xs text-muted-foreground truncate">{period.currentLabel}</p>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs mt-1">
          {getTrendIcon(changePct, isPositiveTrend)}
          <span className="text-muted-foreground truncate">
            {changePct > 0 ? "+" : ""}
            {changePct.toFixed(1)}% vs {period.previousLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Utilisateurs totaux */}
      {renderMetricCard(
        "Utilisateurs totaux",
        metrics.users.toLocaleString(),
        metrics.usersChangePct,
        <Users className="h-4 w-4 text-muted-foreground" />,
      )}

      {/* Nouveaux utilisateurs */}
      {renderMetricCard(
        "Nouveaux utilisateurs",
        metrics.newUsers.toLocaleString(),
        metrics.newUsersChangePct,
        <UserPlus className="h-4 w-4 text-muted-foreground" />,
      )}

      {/* Sessions */}
      {renderMetricCard(
        "Sessions",
        metrics.sessions.toLocaleString(),
        metrics.sessionsChangePct,
        <MousePointer className="h-4 w-4 text-muted-foreground" />,
      )}

      {/* Durée moyenne des sessions */}
      {renderMetricCard(
        "Durée moyenne",
        formatDuration(metrics.averageSessionDuration),
        metrics.averageSessionDurationChangePct,
        <Clock className="h-4 w-4 text-muted-foreground" />,
      )}

      {/* Taux de rebond */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <div>
            <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
            <p className="text-xs text-muted-foreground">{period.currentLabel}</p>
          </div>
          <CardDescription>
            Pourcentage de sessions avec une seule page vue. Un taux élevé peut indiquer que les visiteurs quittent le
            site sans interagir davantage, tandis qu'un taux bas suggère un meilleur engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center flex-wrap gap-4">
            <div className="text-3xl font-bold">{formatPercentage(metrics.bounceRate)}</div>
            <div className="flex items-center space-x-2 text-xs">
              {getTrendIcon(metrics.bounceRateChangePct, false)}
              <span
                className={`text-muted-foreground whitespace-nowrap ${metrics.bounceRateChangePct < 0 ? "text-green-500" : metrics.bounceRateChangePct > 0 ? "text-red-500" : ""}`}
              >
                {metrics.bounceRateChangePct > 0 ? "+" : ""}
                {metrics.bounceRateChangePct.toFixed(1)}% vs {period.previousLabel}
              </span>
            </div>
            <Badge
              variant={metrics.bounceRate < 50 ? "default" : metrics.bounceRate < 70 ? "secondary" : "destructive"}
              className="ml-auto"
            >
              {metrics.bounceRate < 50 ? "Excellent" : metrics.bounceRate < 70 ? "Bon" : "À améliorer"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
