import { Router } from "express";
import changeSeasonRoutes from "./changeSeason.route";
import dungeonRoutes from "./dungeon.route";
import weakAuraRoutes from "./weakAuras.route";

//* /api/v1/**
const router: Router = Router();
// Enregistrer les routes dans l'application

//admin
router.use("/dungeon", dungeonRoutes);
router.use("/change-season", changeSeasonRoutes);
router.use("/weak-aura", weakAuraRoutes);

export default router;
