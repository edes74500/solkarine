"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useGetAnalyticsLast7DaysQuery } from "@/redux/api/analytics.apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/chart";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function LastSevenDays() {
  const { data, isLoading, error } = useGetAnalyticsLast7DaysQuery();
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("7d");

  // Transformer les données de l'API pour le graphique
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.data.map((item) => ({
      date: item.date,
      users: item.users,
    }));
  }, [data]);

  const chartConfig = {
    users: {
      label: "Utilisateurs",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Visiteurs Totaux</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total pour les 7 derniers jours</span>
          <span className="@[540px]/card:hidden">7 derniers jours</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="users" type="natural" fill="url(#fillUsers)" stroke="var(--primary)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
