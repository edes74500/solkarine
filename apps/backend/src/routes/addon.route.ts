import {
  createAddonController,
  deleteAddonController,
  getAddonCountController,
  getAllAddonController,
  updateAddonController,
} from "@/controllers/addon.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllAddonController);
router.post("/create", createAddonController);
router.put("/:id", updateAddonController);
router.delete("/:id", deleteAddonController);
router.get("/count", getAddonCountController);

export default router;
