import { Router } from "express";
import addonRoutes from "./addon.route";
import addonProfilesRoutes from "./addonProfile.route";
import changeSeasonRoutes from "./changeSeason.route";
import characterRoutes from "./character.route";
import dungeonRoutes from "./dungeon.route";
import weakAuraRoutes from "./weakAuras.route";

//* /api/v1/**
const router: Router = Router();
// Enregistrer les routes dans l'application

//admin
router.use("/dungeon", dungeonRoutes);
router.use("/change-season", changeSeasonRoutes);
router.use("/weak-aura", weakAuraRoutes);
router.use("/addon", addonRoutes);
router.use("/addon-profiles", addonProfilesRoutes);
router.use("/character", characterRoutes);

export default router;
