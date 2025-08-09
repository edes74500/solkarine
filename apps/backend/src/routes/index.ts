import cdnRoutes from "@/routes/cdn.routes";
import { Router } from "express";
import addonRoutes from "./addon.route";
import addonProfilesRoutes from "./addonProfile.route";
import authRoutes from "./auth.route";
import changeSeasonRoutes from "./changeSeason.route";
import characterRoutes from "./character.route";
import dungeonRoutes from "./dungeon.route";
import routesRoutes from "./dungeonRoute.route";
import weakAuraRoutes from "./weakAuras.route";

//* /api/v1/**
const router: Router = Router();
// Enregistrer les routes dans l'application

//admin
router.use("/auth", authRoutes);

router.use("/dungeon", dungeonRoutes);
router.use("/change-season", changeSeasonRoutes);
router.use("/weak-aura", weakAuraRoutes);
router.use("/addon", addonRoutes);
router.use("/addon-profiles", addonProfilesRoutes);
router.use("/character", characterRoutes);
router.use("/cdn", cdnRoutes);
router.use("/routes", routesRoutes);

export default router;
