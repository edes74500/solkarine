import { createWeakAura, deleteWeakAuraController, getAllWeakAuraController } from "@/controllers/weakAura.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllWeakAuraController);
router.post("/", createWeakAura);
router.delete("/:id", deleteWeakAuraController);

export default router;
