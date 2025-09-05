import {
  getAcquisitionData,
  getAnalyticsLast7Days,
  getBehaviorData,
  getConversionsData,
  getRealTimeData,
  getTechData,
  getTrafficOverview,
} from "@/controllers/analytics.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/last7days", getAnalyticsLast7Days);
router.get("/traffic-overview", getTrafficOverview);
router.get("/acquisition-data", getAcquisitionData);
router.get("/behavior-data", getBehaviorData);
router.get("/conversions-data", getConversionsData);
router.get("/tech-data", getTechData);
router.get("/real-time-data", getRealTimeData);
router.get("/last7days", getAnalyticsLast7Days);

export default router;
