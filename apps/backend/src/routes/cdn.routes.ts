import { generatePresignedUrl } from "@/controllers/presigned-url.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/generate-presigned-url", generatePresignedUrl);

export default router;
