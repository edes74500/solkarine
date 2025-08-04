import { editDungeonController, getAllDungeonsController } from "@/controllers/dungeon.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllDungeonsController);
router.put("/:id", editDungeonController);

export default router;
