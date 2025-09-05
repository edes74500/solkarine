"use client";

import { ErrorCard } from "@/components/statusCard/ErrorCard";
import { LoadingCard } from "@/components/statusCard/LoadingCard";
import { useGetBehaviorDataQuery } from "@/redux/api/analytics.apiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ChartConfig } from "@repo/ui/components/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Activity, Eye, MousePointer } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Descriptions des événements pour les tooltips
const eventDescriptions: Record<string, string> = {
  // Événements GA4 standards
  page_view: "Déclenché à chaque chargement d'une page ou changement d'URL sur le site.",
  first_visit: "Déclenché uniquement lors de la toute première visite d'un utilisateur (nouveau visiteur).",
  session_start:
    "Marque le début d'une session (nouvelle visite après 30 min d'inactivité ou via une nouvelle source).",
  user_engagement: "Émis régulièrement tant que l'utilisateur interagit activement (scroll, clics, onglet actif).",
  click: "Envoyé lorsqu'un utilisateur clique sur un élément suivi (ex : lien sortant, bouton tracké).",
  scroll: "Enregistré quand l'utilisateur atteint environ 90% de la hauteur d'une page.",
  form_submit: "Déclenché lorsqu'un formulaire suivi est validé par un utilisateur.",
  login: "Déclenché lorsqu'un utilisateur s'authentifie avec succès.",
  signup: "Enregistré lors de la création d'un compte par un nouvel utilisateur.",
  search: "Déclenché lorsqu'un utilisateur effectue une recherche via le moteur interne du site.",
  download: "Enregistré lorsqu'un fichier (ex : PDF, image) est téléchargé.",
  video_play: "Déclenché au démarrage de la lecture d'une vidéo intégrée.",
  add_to_cart: "Enregistré lorsqu'un produit est ajouté au panier.",
  purchase: "Déclenché lorsqu'un achat est finalisé et validé.",
  share: "Enregistré lorsqu'un utilisateur partage du contenu (réseaux sociaux, email, etc.).",

  // Événements personnalisés pour ton projet
  route_view: "Déclenché lorsqu'un utilisateur consulte le détail d'une route de donjon.",
  talent_view: "Enregistré lorsqu'un utilisateur ouvre la fiche d'un talent.",
  dungeon_view: "Déclenché lors de l'affichage de la page d'un donjon.",
  tip_view: "Enregistré quand un utilisateur consulte un conseil ou une astuce.",
};

// Fonction pour obtenir la description d'un événement
const getEventDescription = (eventName: string): string => {
  return eventDescriptions[eventName] || "Action utilisateur sur le site";
};

// Couleurs pour les graphiques
const pageColors = [
  "var(--chart-1)", // violet
  "var(--chart-2)", // vert
  "var(--chart-3)", // jaune
  "var(--chart-4)", // orange
  "var(--chart-5)", // bleu
  "var(--chart-6)", // turquoise
  "var(--chart-7)", // jaune doré
  "var(--chart-8)", // orange clair
  "var(--chart-9)", // vert clair
  "var(--chart-10)", // vert-jaune
];

const eventColors = [
  "var(--chart-1)", // violet
  "var(--chart-5)", // bleu
  "var(--chart-6)", // turquoise
  "var(--chart-2)", // vert
  "var(--chart-9)", // vert clair
  "var(--chart-10)", // vert-jaune
  "var(--chart-3)", // jaune
  "var(--chart-4)", // orange
  "var(--chart-8)", // orange clair
  "var(--chart-7)", // jaune doré
];

export default function BehaviorData() {
  const { data, isLoading, error } = useGetBehaviorDataQuery();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const behaviorData = data?.data;

  if (!behaviorData) return null;

  // Configuration des graphiques
  const pagesConfig = {
    views: {
      label: "Vues",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  const eventsConfig = {
    count: {
      label: "Événements",
      color: "var(--secondary)",
    },
  } satisfies ChartConfig;

  // Formater les données pour les graphiques
  const topPagesData = behaviorData.topPages.map((page, index) => ({
    ...page,
    rank: index + 1,
    path: page.path.length > 30 ? `${page.path.substring(0, 30)}...` : page.path,
    color: pageColors[index % pageColors.length],
  }));

  const eventsData = behaviorData.events.map((event, index) => ({
    ...event,
    rank: index + 1,
    name: event.name.length > 20 ? `${event.name.substring(0, 20)}...` : event.name,
    description: getEventDescription(event.name),
    color: eventColors[index % eventColors.length],
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Comportement des utilisateurs</span>
          </CardTitle>
          <CardDescription>Analyse des pages les plus visitées et des événements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pages" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Pages populaires</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <MousePointer className="h-4 w-4" />
                <span>Événements</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Pages les plus visitées</h4>
                  <div className="text-sm text-muted-foreground">
                    Total: {behaviorData.totalPageViews.toLocaleString()} vues
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topPagesData}
                      layout="vertical"
                      margin={{ left: 150, right: 20, top: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={true}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <YAxis dataKey="path" type="category" tickLine={false} axisLine={true} width={150} />
                      <Tooltip
                        formatter={(value) => [value.toLocaleString(), "Vues"]}
                        labelFormatter={(label) => `Page: ${label}`}
                      />
                      <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                        {topPagesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tableau des pages */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Détails des pages</h5>
                  <div className="space-y-1">
                    {topPagesData.slice(0, 5).map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">#{page.rank}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: page.color }}></div>
                            <span className="text-sm font-medium truncate max-w-[300px]">{page.path}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold">{page.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <h4 className="text-sm font-medium">Événements les plus fréquents</h4>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={eventsData}
                      layout="vertical"
                      margin={{ left: 150, right: 20, top: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={true}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={true} width={150} />
                      <Tooltip
                        formatter={(value) => [value.toLocaleString(), "Événements"]}
                        labelFormatter={(label, payload) => {
                          const item = payload && payload[0] ? payload[0].payload : null;
                          return `Événement: ${label}${item?.description ? ` - ${item.description}` : ""}`;
                        }}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {eventsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tableau des événements */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Détails des événements</h5>
                  <div className="space-y-1">
                    {eventsData.slice(0, 5).map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        title={event.description}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">#{event.rank}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }}></div>
                            <span className="text-sm font-medium">{event.name}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold">{event.count.toLocaleString()}</span>
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
