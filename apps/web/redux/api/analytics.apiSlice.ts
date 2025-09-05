import { apiSlice } from "@/redux/api/config/apiSlice";

// Types basés sur analytics.controller.ts
interface AnalyticsLast7DaysResponse {
  success: boolean;
  data: { date: string; users: number }[];
  cache?: boolean;
}

interface TrafficOverviewResponse {
  success: boolean;
  data: {
    users: number;
    usersChangePct: number;
    newUsers: number;
    newUsersChangePct: number;
    sessions: number;
    sessionsChangePct: number;
    averageSessionDuration: number;
    averageSessionDurationChangePct: number;
    bounceRate: number;
    bounceRateChangePct: number;
  };
  period: {
    currentLabel: string;
    previousLabel: string;
  };
  cache?: boolean;
}

interface AcquisitionData {
  channels: { channel: string; sessions: number }[];
  sourceMedium: { source: string; medium: string; sessions: number }[];
  campaigns: { campaign: string; sessions: number }[];
}

interface BehaviorData {
  totalPageViews: number;
  topPages: { path: string; views: number }[];
  events: { name: string; count: number }[];
}

interface ConversionsData {
  conversions: { event: string; count: number; rate: number }[];
  revenue: { total: number; transactions: number };
}

interface TechData {
  devices: { category: string; sessions: number }[];
  browsers: { name: string; sessions: number }[];
  operatingSystems: { name: string; sessions: number }[];
  countries: { name: string; sessions: number }[];
}

interface RealTimeData {
  activeUsers: number;
  pages: { page: string; activeUsers: number }[];
}

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsLast7Days: builder.query<AnalyticsLast7DaysResponse, void>({
      query: () => "/analytics/last7days",
    }),
    getTrafficOverview: builder.query<TrafficOverviewResponse, void>({
      query: () => "/analytics/traffic-overview",
    }),
    getAcquisitionData: builder.query<{ success: boolean; data: AcquisitionData; cache?: boolean }, void>({
      query: () => "/analytics/acquisition-data",
    }),
    getBehaviorData: builder.query<{ success: boolean; data: BehaviorData; cache?: boolean }, void>({
      query: () => "/analytics/behavior-data",
    }),
    getConversionsData: builder.query<{ success: boolean; data: ConversionsData; cache?: boolean }, void>({
      query: () => "/analytics/conversions-data",
    }),
    getTechData: builder.query<{ success: boolean; data: TechData; cache?: boolean }, void>({
      query: () => "/analytics/tech-data",
    }),
    getRealTimeData: builder.query<{ success: boolean; data: RealTimeData }, void>({
      query: () => "/analytics/real-time-data",
    }),
  }),
});

export const {
  useGetAnalyticsLast7DaysQuery,
  useGetTrafficOverviewQuery,
  useGetAcquisitionDataQuery,
  useGetBehaviorDataQuery,
  useGetConversionsDataQuery,
  useGetTechDataQuery,
  useGetRealTimeDataQuery,
} = analyticsApiSlice;
