import { changeSeasonController } from "@/controllers/dungeon.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/", changeSeasonController);

export default router;
