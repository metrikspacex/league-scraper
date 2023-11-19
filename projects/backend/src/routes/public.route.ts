import { Router } from "express";

import { PublicController } from "@/controllers";

const router = Router();
const controller = new PublicController();
router.get("/api/v1/public", controller.access);
export { router as publicRoutes };
