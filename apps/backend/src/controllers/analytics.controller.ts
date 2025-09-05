import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { Request, Response } from "express";
import { redis } from "../config/redis.config";

const analytics = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA4_CLIENT_EMAIL,
    private_key: process.env.GA4_CLIENT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const PROPERTY = process.env.GA4_PROPERTY_ID!;
const TTL_SECONDS = 60 * 30; // 30 min

const toB64 = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString("base64");
const fromB64 = <T = unknown>(b64: string): T => JSON.parse(Buffer.from(b64, "base64").toString("utf8"));

// Vérification des variables d'environnement GA4
const checkGA4Credentials = () => {
  if (!process.env.GA4_CLIENT_EMAIL || !process.env.GA4_CLIENT_PRIVATE_KEY || !process.env.GA4_PROPERTY_ID) {
    return false;
  }
  return true;
};

// 1. Vue d'ensemble du trafic
// compare 30 derniers jours vs 30 jours précédents
export const getTrafficOverview = async (_req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res.status(500).json({ success: false, error: "GA4 env not set" });
  }

  const CACHE_KEY = `solkarine/analytics:traffic-overview:v2`;

  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) return res.status(200).json({ success: true, ...fromB64(cached), cache: true });

    // Première requête pour la période actuelle
    const [currentReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
    });

    // Deuxième requête pour la période précédente
    const [previousReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "60daysAgo", endDate: "31daysAgo" }],
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
    });

    const currentValues = currentReport.rows?.[0]?.metricValues || [];
    const previousValues = previousReport.rows?.[0]?.metricValues || [];

    const asNum = (values: any[], idx: number) => Number(values[idx]?.value || 0);

    const m = {
      users: { cur: asNum(currentValues, 0), prev: asNum(previousValues, 0) },
      newUsers: { cur: asNum(currentValues, 1), prev: asNum(previousValues, 1) },
      sessions: { cur: asNum(currentValues, 2), prev: asNum(previousValues, 2) },
      averageSessionDuration: { cur: asNum(currentValues, 3), prev: asNum(previousValues, 3) },
      bounceRate: { cur: asNum(currentValues, 4), prev: asNum(previousValues, 4) },
    };

    const pct = (cur: number, prev: number) => (prev === 0 ? (cur === 0 ? 0 : 100) : ((cur - prev) / prev) * 100);

    const payload = {
      data: {
        users: m.users.cur,
        usersChangePct: pct(m.users.cur, m.users.prev),

        newUsers: m.newUsers.cur,
        newUsersChangePct: pct(m.newUsers.cur, m.newUsers.prev),

        sessions: m.sessions.cur,
        sessionsChangePct: pct(m.sessions.cur, m.sessions.prev),

        averageSessionDuration: m.averageSessionDuration.cur,
        averageSessionDurationChangePct: pct(m.averageSessionDuration.cur, m.averageSessionDuration.prev),

        bounceRate: m.bounceRate.cur,
        bounceRateChangePct: pct(m.bounceRate.cur, m.bounceRate.prev),
      },
      period: { currentLabel: "30 derniers jours", previousLabel: "30 jours précédents" },
      cache: false,
    };

    await redis.set(CACHE_KEY, toB64(payload), "EX", TTL_SECONDS);
    return res.status(200).json({ success: true, ...payload });
  } catch (err) {
    console.error("GA4 traffic overview error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 traffic overview data" });
  }
};

// 2. Acquisition (d'où viennent les visiteurs)
export const getAcquisitionData = async (req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res
      .status(500)
      .json({ success: false, error: "GA4_CLIENT_EMAIL, GA4_CLIENT_PRIVATE_KEY, GA4_PROPERTY_ID are not set" });
  }

  const CACHE_KEY = `solkarine/analytics:acquisition`;

  try {
    // Vérifier le cache
    const cachedB64 = await redis.get(CACHE_KEY);
    if (cachedB64) {
      const data = fromB64(cachedB64);
      return res.status(200).json({ success: true, data, cache: true });
    }

    // Canaux d'acquisition
    const [channelsReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    });

    // Source / Medium
    const [sourceReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    // Campagnes
    const [campaignReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionCampaignName" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const data = {
      channels:
        channelsReport.rows?.map((row) => ({
          channel: row.dimensionValues?.[0]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      sourceMedium:
        sourceReport.rows?.map((row) => ({
          source: row.dimensionValues?.[0]?.value || "Unknown",
          medium: row.dimensionValues?.[1]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      campaigns:
        campaignReport.rows?.map((row) => ({
          campaign: row.dimensionValues?.[0]?.value || "(not set)",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
    };

    // Mise en cache
    await redis.set(CACHE_KEY, toB64(data), "EX", TTL_SECONDS);
    console.log(data);

    return res.status(200).json({ success: true, data, cache: false });
  } catch (err) {
    console.error("GA4 acquisition error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 acquisition data" });
  }
};

// 3. Comportement
export const getBehaviorData = async (req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res
      .status(500)
      .json({ success: false, error: "GA4_CLIENT_EMAIL, GA4_CLIENT_PRIVATE_KEY, GA4_PROPERTY_ID are not set" });
  }

  const CACHE_KEY = `solkarine/analytics:behavior`;

  try {
    // Vérifier le cache
    const cachedB64 = await redis.get(CACHE_KEY);
    if (cachedB64) {
      const data = fromB64(cachedB64);
      return res.status(200).json({ success: true, data, cache: true });
    }

    // Pages vues
    const [pageViewsReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "screenPageViews" }],
    });

    // Top pages
    const [topPagesReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    // Événements personnalisés
    const [eventsReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 10,
    });

    const data = {
      totalPageViews: Number(pageViewsReport.rows?.[0]?.metricValues?.[0]?.value || 0),
      topPages:
        topPagesReport.rows?.map((row) => ({
          path: row.dimensionValues?.[0]?.value || "/",
          views: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      events:
        eventsReport.rows?.map((row) => ({
          name: row.dimensionValues?.[0]?.value || "Unknown",
          count: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
    };

    // Mise en cache
    await redis.set(CACHE_KEY, toB64(data), "EX", TTL_SECONDS);

    return res.status(200).json({ success: true, data, cache: false });
  } catch (err) {
    console.error("GA4 behavior error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 behavior data" });
  }
};

// 4. Conversions //* pas encore utilisé, sert a traquer les conversions c;est a dire les actions qui ont eu lieu sur le site a regler sur le site de google
export const getConversionsData = async (req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res
      .status(500)
      .json({ success: false, error: "GA4_CLIENT_EMAIL, GA4_CLIENT_PRIVATE_KEY, GA4_PROPERTY_ID are not set" });
  }

  const CACHE_KEY = `solkarine/analytics:conversions`;

  try {
    // Vérifier le cache
    const cachedB64 = await redis.get(CACHE_KEY);
    if (cachedB64) {
      const data = fromB64(cachedB64);
      return res.status(200).json({ success: true, data, cache: true });
    }

    // Conversions définies
    const [conversionsReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "conversionEvent" }],
      metrics: [{ name: "conversions" }, { name: "conversionRate" }],
      orderBys: [{ metric: { metricName: "conversions" }, desc: true }],
    });

    // Revenus (si e-commerce)
    const [revenueReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "totalRevenue" }, { name: "transactions" }],
    });

    const data = {
      conversions:
        conversionsReport.rows?.map((row) => ({
          event: row.dimensionValues?.[0]?.value || "Unknown",
          count: Number(row.metricValues?.[0]?.value || 0),
          rate: Number(row.metricValues?.[1]?.value || 0),
        })) || [],
      revenue: {
        total: Number(revenueReport.rows?.[0]?.metricValues?.[0]?.value || 0),
        transactions: Number(revenueReport.rows?.[0]?.metricValues?.[1]?.value || 0),
      },
    };

    // Mise en cache
    await redis.set(CACHE_KEY, toB64(data), "EX", TTL_SECONDS);

    return res.status(200).json({ success: true, data, cache: false });
  } catch (err) {
    console.error("GA4 conversions error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 conversions data" });
  }
};

// 5. Techno / Device
export const getTechData = async (req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res
      .status(500)
      .json({ success: false, error: "GA4_CLIENT_EMAIL, GA4_CLIENT_PRIVATE_KEY, GA4_PROPERTY_ID are not set" });
  }

  const CACHE_KEY = `solkarine/analytics:tech`;

  try {
    // Vérifier le cache
    const cachedB64 = await redis.get(CACHE_KEY);
    if (cachedB64) {
      const data = fromB64(cachedB64);
      return res.status(200).json({ success: true, data, cache: true });
    }

    // Appareils
    const [deviceReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
    });

    // Navigateurs
    const [browserReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "browser" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 5,
    });

    // OS
    const [osReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "operatingSystem" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 5,
    });

    // Localisation
    const [countryReport] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "country" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const data = {
      devices:
        deviceReport.rows?.map((row) => ({
          category: row.dimensionValues?.[0]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      browsers:
        browserReport.rows?.map((row) => ({
          name: row.dimensionValues?.[0]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      operatingSystems:
        osReport.rows?.map((row) => ({
          name: row.dimensionValues?.[0]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
      countries:
        countryReport.rows?.map((row) => ({
          name: row.dimensionValues?.[0]?.value || "Unknown",
          sessions: Number(row.metricValues?.[0]?.value || 0),
        })) || [],
    };

    // Mise en cache
    await redis.set(CACHE_KEY, toB64(data), "EX", TTL_SECONDS);

    return res.status(200).json({ success: true, data, cache: false });
  } catch (err) {
    console.error("GA4 tech error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 tech data" });
  }
};

// =======================
// 3) Temps réel (Realtime) //* pas encore utilisé
// =======================
export const getRealTimeData = async (_req: Request, res: Response) => {
  try {
    // 1) Total global d’utilisateurs actifs (⚠️ sans dimension)
    const [totalRep] = await analytics.runRealtimeReport({
      property: PROPERTY,
      metrics: [{ name: "activeUsers" }],
      minuteRanges: [{ name: "last30m", startMinutesAgo: 29, endMinutesAgo: 0 }],
      returnPropertyQuota: false,
    });

    const activeUsers =
      Number(totalRep.totals?.[0]?.metricValues?.[0]?.value ?? 0) ||
      Number(totalRep.rows?.[0]?.metricValues?.[0]?.value ?? 0) ||
      0;

    console.log("activeUsers", activeUsers);

    // 2) Top pages (dimensions compatibles Realtime)
    // Ordre conseillé : unifiedPagePath (web), pageTitle (web), unifiedScreenName (app)
    const pageDims = ["unifiedPagePath", "pageTitle", "unifiedScreenName"];
    // const pagesRes = await realtimeWithFallbackDim(pageDims, 10);

    // 3) Top sources (selon ta propriété, sessionSourceMedium ou sessionSource)
    const sourceDims = ["sessionSourceMedium", "sessionSource"];
    // const sourcesRes = await realtimeWithFallbackDim(sourceDims, 5);

    return res.status(200).json({
      success: true,
      data: {
        activeUsers,
        pages: [],
        sources: [],
        _debug: {
          pageDimensionUsed: [],
          sourceDimensionUsed: [],
        },
      },
    });
  } catch (err: any) {
    console.error("Realtime error:", {
      message: err?.message,
      code: err?.code,
      details: err?.details,
    });
    return res.status(500).json({ success: false, error: "Realtime GA4 fetch failed" });
  }
};

// Maintien de la fonction existante pour la compatibilité
export const getAnalyticsLast7Days = async (req: Request, res: Response) => {
  if (!checkGA4Credentials()) {
    return res
      .status(500)
      .json({ success: false, error: "GA4_CLIENT_EMAIL, GA4_CLIENT_PRIVATE_KEY, GA4_PROPERTY_ID are not set" });
  }

  const CACHE_KEY = `solkarine/analytics:last7days:${PROPERTY}`;

  try {
    // 1) Check cache
    const cachedB64 = await redis.get(CACHE_KEY);
    if (cachedB64) {
      console.log("Cache hit");
      const data = fromB64<{ date: string; users: number }[]>(cachedB64);
      return res.status(200).json({ success: true, data, cache: true });
    }

    // 2) Call GA4
    const [report] = await analytics.runReport({
      property: PROPERTY,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    // 3) Map -> YYYY-MM-DD
    const gaData: Record<string, number> = {};
    for (const row of report.rows || []) {
      const dateStr = row.dimensionValues?.[0]?.value; // "YYYYMMDD"
      if (dateStr) {
        const iso = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
        gaData[iso] = Number(row.metricValues?.[0]?.value || 0);
      }
    }

    // 4) Build 7 days window (0 si manquant)
    const today = new Date();
    const days: { date: string; users: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      days.push({ date: iso, users: gaData[iso] || 0 });
    }

    // 5) Store en base64 sous "solkarine/analytics"
    await redis.set(CACHE_KEY, toB64(days), "EX", TTL_SECONDS);

    return res.status(200).json({ success: true, data: days, cache: false });
  } catch (err) {
    console.error("GA4 last7days error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch GA4 data" });
  }
};
