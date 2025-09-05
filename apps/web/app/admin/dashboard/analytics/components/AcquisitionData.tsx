"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetAcquisitionDataQuery } from "@/redux/api/analytics.apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Globe, Megaphone, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

// Utilisation des couleurs définies dans globals.css
const COLORS = [
  "var(--chart-1)", // violet
  "var(--chart-6)", // turquoise
  "var(--chart-4)", // orange
  "var(--chart-5)", // bleu
  "var(--chart-2)", // vert
  "var(--chart-3)", // jaune
];

// Descriptions des canaux d'acquisition pour les tooltips
const channelDescriptions: Record<string, string> = {
  Direct: "Visiteurs qui ont saisi directement l'URL du site ou utilisé un signet (sans référent identifiable).",
  "Organic Search": "Visiteurs provenant des résultats naturels des moteurs de recherche comme Google, Bing, etc.",
  Referral: "Visiteurs venant d'autres sites web via des liens externes pointant vers votre site.",
  Social: "Visiteurs provenant des réseaux sociaux comme Facebook, Twitter, Instagram, LinkedIn, etc.",
  Email: "Visiteurs qui ont cliqué sur un lien dans un email marketing ou une newsletter.",
  "Paid Search":
    "Visiteurs provenant de campagnes publicitaires payantes sur les moteurs de recherche (Google Ads, etc.).",
  Display: "Visiteurs venant de bannières publicitaires sur d'autres sites web.",
  Affiliates: "Visiteurs provenant de programmes d'affiliation marketing.",
  Video: "Visiteurs venant de plateformes vidéo comme YouTube.",
  "(not set)": "Visiteurs dont le canal d'acquisition n'a pas pu être déterminé.",
  Unassigned: "Visiteurs dont les données ne correspondent à aucun canal défini.",
};

export default function AcquisitionData() {
  const { data, isLoading, error } = useGetAcquisitionDataQuery();
  console.log(data);

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const acquisitionData = data?.data;

  if (!acquisitionData) return null;

  // Configuration des graphiques
  const channelsConfig = {
    sessions: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  const sourceMediumConfig = {
    sessions: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  const campaignsConfig = {
    sessions: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  // Fonction pour obtenir la description d'un canal
  const getChannelDescription = (channel: string): string => {
    return channelDescriptions[channel] || "Visiteurs provenant de ce canal d'acquisition.";
  };

  // Filtrer les campagnes pour exclure "(direct)" et "(not set)"
  const filteredCampaigns = acquisitionData.campaigns.filter(
    (campaign) => campaign.campaign !== "(direct)" && campaign.campaign !== "(not set)",
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Données d'acquisition</span>
          </CardTitle>
          <CardDescription>
            Analyse des canaux, sources et campagnes qui amènent les visiteurs sur votre site. Ces données vous aident à
            comprendre comment les utilisateurs découvrent votre site et quelles stratégies marketing sont les plus
            efficaces.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="channels" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Canaux</span>
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Sources</span>
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center space-x-2">
                <Megaphone className="h-4 w-4" />
                <span>Campagnes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-muted-foreground">
                  Les canaux d'acquisition sont les catégories générales par lesquelles les utilisateurs arrivent sur
                  votre site (recherche organique, réseaux sociaux, accès direct, etc.). Ils permettent d'évaluer
                  l'efficacité de vos différentes stratégies marketing.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sessions par canal</h4>
                  <ChartContainer config={channelsConfig} className="h-[300px] w-full">
                    <BarChart data={acquisitionData.channels}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.channel,
                          getChannelDescription(props.payload.channel),
                        ]}
                      />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {acquisitionData.channels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Répartition des canaux</h4>
                  <ChartContainer config={channelsConfig} className="h-[300px] w-full">
                    <PieChart>
                      <Pie
                        data={acquisitionData.channels}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ channel, percent }) => `${channel} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sessions"
                      >
                        {acquisitionData.channels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.channel,
                          getChannelDescription(props.payload.channel),
                        ]}
                      />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-muted-foreground">
                  Les sources représentent les sites ou plateformes spécifiques d'où proviennent vos visiteurs
                  (google.com, facebook.com), tandis que le média indique la méthode de référencement (organique, cpc,
                  email, etc.). Cette combinaison offre une vue détaillée de l'origine exacte de votre trafic.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4">Sessions par source/média</h4>
                <ChartContainer config={sourceMediumConfig} className="h-[400px] w-full">
                  <BarChart data={acquisitionData.sourceMedium} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="source" type="category" tickLine={false} axisLine={false} width={100} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => [
                        value,
                        `${props.payload.source} / ${props.payload.medium}`,
                        `Source: site ou plateforme d'origine. Média: méthode de référencement (organique, payant, etc.)`,
                      ]}
                    />
                    <Bar dataKey="sessions" radius={[0, 4, 4, 0]}>
                      {acquisitionData.sourceMedium.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-muted-foreground">
                  Les campagnes sont des initiatives marketing spécifiques identifiées par des paramètres UTM dans les
                  URLs. Seules les campagnes avec des paramètres UTM explicites sont affichées ici.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4">Sessions par campagne</h4>
                {filteredCampaigns.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aucune campagne publicitaire n'a été trouvée pour la période sélectionnée.</p>
                    <p className="text-sm mt-2">
                      Pour suivre vos campagnes, utilisez des paramètres UTM dans vos liens marketing.
                    </p>
                  </div>
                ) : (
                  <ChartContainer config={campaignsConfig} className="h-[400px] w-full">
                    <BarChart data={filteredCampaigns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="campaign"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                        {filteredCampaigns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
