"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetTechDataQuery } from "@/redux/api/analytics.apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Globe, MapPin, Monitor, Smartphone } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

// Utilisation des couleurs définies dans globals.css
const COLORS = [
  "var(--chart-1)", // violet
  "var(--chart-6)", // turquoise
  "var(--chart-3)", // jaune
  "var(--chart-4)", // orange
  "var(--chart-5)", // bleu
  "var(--chart-2)", // vert
  "var(--chart-7)", // jaune doré
  "var(--chart-8)", // orange clair
];

export default function TechData() {
  const { data, isLoading, error } = useGetTechDataQuery();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const techData = data?.data;

  if (!techData) return null;

  // Configuration des graphiques
  const sessionsConfig = {
    sessions: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  // Formater les données pour les graphiques
  const devicesData = techData.devices.map((device) => ({
    ...device,
    category:
      device.category === "desktop"
        ? "Ordinateur"
        : device.category === "mobile"
          ? "Mobile"
          : device.category === "tablet"
            ? "Tablette"
            : device.category,
  }));

  const browsersData = techData.browsers.map((browser) => ({
    ...browser,
    name: browser.name.length > 15 ? `${browser.name.substring(0, 15)}...` : browser.name,
  }));

  const osData = techData.operatingSystems.map((os) => ({
    ...os,
    name: os.name.length > 20 ? `${os.name.substring(0, 20)}...` : os.name,
  }));

  const countriesData = techData.countries.map((country) => ({
    ...country,
    name: country.name.length > 15 ? `${country.name.substring(0, 15)}...` : country.name,
  }));

  const getDeviceIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "desktop":
      case "ordinateur":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
      case "tablette":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Données techniques</span>
          </CardTitle>
          <CardDescription>
            Analyse des appareils, navigateurs, systèmes d'exploitation et géolocalisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="devices" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="devices" className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Appareils</span>
              </TabsTrigger>
              <TabsTrigger value="browsers" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Navigateurs</span>
              </TabsTrigger>
              <TabsTrigger value="os" className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Systèmes</span>
              </TabsTrigger>
              <TabsTrigger value="countries" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Pays</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="devices" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sessions par type d'appareil</h4>
                  <ChartContainer config={sessionsConfig} className="h-[300px] w-full">
                    <BarChart data={devicesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {devicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Répartition des appareils</h4>
                  <ChartContainer config={sessionsConfig} className="h-[300px] w-full">
                    <PieChart>
                      <Pie
                        data={devicesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        dataKey="sessions"
                      >
                        {devicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="browsers" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sessions par navigateur</h4>
                  <ChartContainer config={sessionsConfig} className="h-[300px] w-full">
                    <BarChart data={browsersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {browsersData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Top 5 navigateurs</h4>
                  <div className="space-y-2">
                    {browsersData.slice(0, 5).map((browser, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                          <span className="text-sm font-medium">{browser.name}</span>
                        </div>
                        <span className="text-sm font-bold">{browser.sessions.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="os" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sessions par système d'exploitation</h4>
                  <ChartContainer config={sessionsConfig} className="h-[300px] w-full">
                    <BarChart data={osData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {osData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Top 5 systèmes d'exploitation</h4>
                  <div className="space-y-2">
                    {osData.slice(0, 5).map((os, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                          <span className="text-sm font-medium">{os.name}</span>
                        </div>
                        <span className="text-sm font-bold">{os.sessions.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="countries" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sessions par pays</h4>
                  <ChartContainer config={sessionsConfig} className="h-[300px] w-full">
                    <BarChart data={countriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {countriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Top 5 pays</h4>
                  <div className="space-y-2">
                    {countriesData.slice(0, 5).map((country, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                          <span className="text-sm font-medium">{country.name}</span>
                        </div>
                        <span className="text-sm font-bold">{country.sessions.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
