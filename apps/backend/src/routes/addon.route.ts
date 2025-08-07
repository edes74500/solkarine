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
router.get("/count", getAddonCountController);
// router.get("/tags", getAllAddonsTagsController);
router.put("/:id", updateAddonController);
router.delete("/:id", deleteAddonController);

export default router;
