import {
  addTalentController,
  deleteTalentController,
  getAllTalentsWithPopulatedDungeonController,
  updateTalentController,
} from "@/controllers/talents.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/get-all-with-populated-dungeon", getAllTalentsWithPopulatedDungeonController);
router.post("/create", addTalentController);
router.delete("/delete/:id", deleteTalentController);
router.put("/update/:id", updateTalentController);

export default router;
