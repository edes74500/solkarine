import { getYouTubeLatestController } from "@/controllers/youtube.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/latest", getYouTubeLatestController);

export default router;
