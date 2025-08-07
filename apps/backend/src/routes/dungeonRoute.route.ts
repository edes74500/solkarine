import {
  createRouteController,
  deleteRouteController,
  getRoutesWithPopulatedDungeonController,
  updateRouteController,
} from "@/controllers/route.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/routes-with-populated-dungeon", getRoutesWithPopulatedDungeonController);
router.post("/create", createRouteController);
router.delete("/delete/:id", deleteRouteController);
router.put("/update/:id", updateRouteController);

export default router;
