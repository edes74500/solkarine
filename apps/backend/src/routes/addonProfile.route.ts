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
router.put("/edit/:id", updateAddonProfileController);
router.delete("/delete/:id", deleteAddonProfileController);
router.get("/count", getAddonProfileCountController);

export default router;
