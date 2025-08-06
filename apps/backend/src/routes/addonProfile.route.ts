import {
  createAddonProfileController,
  deleteAddonProfileController,
  getAddonProfileCountController,
  getAddonProfilesController,
  updateAddonProfileController,
} from "@/controllers/addonProfile.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAddonProfilesController);
router.post("/create", createAddonProfileController);
router.put("/:id", updateAddonProfileController);
router.delete("/:id", deleteAddonProfileController);
router.get("/count", getAddonProfileCountController);

export default router;
