import { getAllDungeonsController } from "@/controllers/dungeon.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllDungeonsController);

export default router;
