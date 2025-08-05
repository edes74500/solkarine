import {
  createWeakAuraController,
  deleteWeakAuraController,
  getAllWeakAuraController,
  getWeakAuraScrapperController,
  updateWeakAuraController,
} from "@/controllers/weakAura.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllWeakAuraController);
router.post("/scrapper", getWeakAuraScrapperController);
router.post("/create", createWeakAuraController);
router.delete("/:id", deleteWeakAuraController);
router.put("/:id", updateWeakAuraController);

export default router;
