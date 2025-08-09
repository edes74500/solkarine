import { login, logout, refreshAccessToken } from "@/controllers/auth/auth.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/login", login);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
