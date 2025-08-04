import { createWeakAura, getAllWeakAuraController } from "@/controllers/weakAura.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllWeakAuraController);
router.post("/", createWeakAura);

export default router;
