// "use client";

// import { ErrorCard } from "@/components/statusCard/ErrorCard";
// import { LoadingCard } from "@/components/statusCard/LoadingCard";
// import { useGetConversionsDataQuery } from "@/redux/api/analytics.apiSlice";
// import { Badge } from "@repo/ui/components/badge";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/chart";
// import { DollarSign, Target, TrendingDown, TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

// const CONVERSION_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// export default function ConversionsData() {
//   const { data, isLoading, error } = useGetConversionsDataQuery();

//   if (isLoading) return <LoadingCard />;
//   if (error) return <ErrorCard />;

//   const conversionsData = data?.data;

//   if (!conversionsData) return null;

//   // Configuration des graphiques
//   const conversionsConfig = {
//     count: {
//       label: "Conversions",
//       color: "hsl(var(--primary))",
//     },
//     rate: {
//       label: "Taux de conversion",
//       color: "hsl(var(--secondary))",
//     },
//   } satisfies ChartConfig;

//   const revenueConfig = {
//     total: {
//       label: "Revenus totaux",
//       color: "hsl(var(--primary))",
//     },
//     transactions: {
//       label: "Transactions",
//       color: "hsl(var(--secondary))",
//     },
//   } satisfies ChartConfig;

//   // Formater les données pour les graphiques
//   const conversionsChartData = conversionsData.conversions.map((conv, index) => ({
//     ...conv,
//     event: conv.event.length > 15 ? `${conv.event.substring(0, 15)}...` : conv.event,
//   }));

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("fr-FR", {
//       style: "currency",
//       currency: "EUR",
//     }).format(amount);
//   };

//   const formatPercentage = (value: number) => {
//     return `${value.toFixed(2)}%`;
//   };

//   const getConversionBadge = (rate: number) => {
//     if (rate >= 5) return <Badge variant="default">Excellent</Badge>;
//     if (rate >= 2) return <Badge variant="secondary">Bon</Badge>;
//     if (rate >= 1) return <Badge variant="outline">Moyen</Badge>;
//     return <Badge variant="destructive">Faible</Badge>;
//   };

//   const getTrendIcon = (value: number) => {
//     return value > 0 ? (
//       <TrendingUp className="h-4 w-4 text-green-500" />
//     ) : (
//       <TrendingDown className="h-4 w-4 text-red-500" />
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Métriques de conversion */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Conversions totales</CardTitle>
//             <Target className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {conversionsData.conversions.reduce((sum, conv) => sum + conv.count, 0).toLocaleString()}
//             </div>
//             <div className="flex items-center space-x-2 text-xs text-muted-foreground">
//               {getTrendIcon(0)}
//               <span>vs période précédente</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Taux moyen</CardTitle>
//             <Target className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {formatPercentage(
//                 conversionsData.conversions.reduce((sum, conv) => sum + conv.rate, 0) /
//                   conversionsData.conversions.length,
//               )}
//             </div>
//             <div className="flex items-center space-x-2 text-xs text-muted-foreground">
//               {getTrendIcon(0)}
//               <span>vs période précédente</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(conversionsData.revenue.total)}</div>
//             <div className="flex items-center space-x-2 text-xs text-muted-foreground">
//               {getTrendIcon(0)}
//               <span>vs période précédente</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Transactions</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{conversionsData.revenue.transactions.toLocaleString()}</div>
//             <div className="flex items-center space-x-2 text-xs text-muted-foreground">
//               {getTrendIcon(0)}
//               <span>vs période précédente</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Graphiques de conversion */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Target className="h-5 w-5" />
//             <span>Analyse des conversions</span>
//           </CardTitle>
//           <CardDescription>Détail des conversions par événement et taux de conversion</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Graphique en barres des conversions */}
//             <div>
//               <h4 className="text-sm font-medium mb-4">Conversions par événement</h4>
//               <ChartContainer config={conversionsConfig} className="h-[300px] w-full">
//                 <BarChart data={conversionsChartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="event"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     angle={-45}
//                     textAnchor="end"
//                     height={80}
//                   />
//                   <YAxis
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     tickFormatter={(value) => value.toLocaleString()}
//                   />
//                   <ChartTooltip
//                     content={<ChartTooltipContent />}
//                     formatter={(value, name) => [value, name === "count" ? "Conversions" : "Taux (%)"]}
//                   />
//                   <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ChartContainer>
//             </div>

//             {/* Graphique en secteurs des taux de conversion */}
//             <div>
//               <h4 className="text-sm font-medium mb-4">Répartition des taux de conversion</h4>
//               <ChartContainer config={conversionsConfig} className="h-[300px] w-full">
//                 <PieChart>
//                   <Pie
//                     data={conversionsData.conversions}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ event, rate }) => `${event} ${rate.toFixed(1)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="rate"
//                   >
//                     {conversionsData.conversions.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={CONVERSION_COLORS[index % CONVERSION_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip
//                     content={<ChartTooltipContent />}
//                     formatter={(value, name) => [`${value.toFixed(2)}%`, "Taux de conversion"]}
//                   />
//                 </PieChart>
//               </ChartContainer>
//             </div>
//           </div>

//           {/* Tableau détaillé des conversions */}
//           <div className="mt-6 space-y-2">
//             <h4 className="text-sm font-medium">Détails des conversions</h4>
//             <div className="space-y-1">
//               {conversionsData.conversions.map((conversion, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
//                   <div className="flex items-center space-x-3">
//                     <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
//                     <span className="text-sm font-medium">{conversion.event}</span>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="text-right">
//                       <div className="text-sm font-bold">{conversion.count.toLocaleString()}</div>
//                       <div className="text-xs text-muted-foreground">conversions</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm font-bold">{formatPercentage(conversion.rate)}</div>
//                       <div className="text-xs text-muted-foreground">taux</div>
//                     </div>
//                     {getConversionBadge(conversion.rate)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
