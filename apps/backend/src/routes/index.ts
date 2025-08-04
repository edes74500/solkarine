import { Router } from "express";
import changeSeasonRoutes from "./changeSeason.route";
import dungeonRoutes from "./dungeon.route";

//* /api/v1/**
const router: Router = Router();
// Enregistrer les routes dans l'application

//admin
router.use("/dungeon", dungeonRoutes);
router.use("/change-season", changeSeasonRoutes);

export default router;
